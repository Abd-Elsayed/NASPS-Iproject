using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace Nasps.Api.Services;

// Native Gemini support is additive; the original chat/completions transport stays intact.
internal static class GeminiAiTransport
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        PropertyNameCaseInsensitive = true,
    };

    internal static async Task<T> CallAsync<T>(HttpClient client, AiProviderOptions settings,
        string systemPrompt, string userPrompt, Func<T?, T> validate, CancellationToken cancellationToken)
    {
        // A Gemini credential must only be sent to Google's API, never a user-supplied host.
        if (!Uri.TryCreate(settings.BaseUrl, UriKind.Absolute, out var baseUri)
            || baseUri.Scheme != Uri.UriSchemeHttps
            || !baseUri.Host.Equals("generativelanguage.googleapis.com", StringComparison.OrdinalIgnoreCase)
            || !baseUri.IsDefaultPort || !string.IsNullOrEmpty(baseUri.UserInfo)
            || baseUri.AbsolutePath.TrimEnd('/') != "/v1beta"
            || !string.IsNullOrEmpty(baseUri.Query) || !string.IsNullOrEmpty(baseUri.Fragment))
            throw new AiNotConfiguredException("For Gemini, set Ai:BaseUrl to https://generativelanguage.googleapis.com/v1beta/.");
        if (string.IsNullOrWhiteSpace(settings.Model)
            || settings.Model.Any(character => !char.IsAsciiLetterOrDigit(character) && character is not '-' and not '_' and not '.'))
            throw new AiNotConfiguredException("Set Ai:Model to a Gemini model name, without a URL or models/ prefix.");

        HttpRequestMessage BuildRequest()
        {
            var message = new HttpRequestMessage(HttpMethod.Post,
                $"https://generativelanguage.googleapis.com/v1beta/models/{Uri.EscapeDataString(settings.Model)}:generateContent");
            message.Headers.Add("x-goog-api-key", settings.ApiKey);
            message.Content = JsonContent.Create(new
            {
                systemInstruction = new { parts = new[] { new { text = systemPrompt } } },
                contents = new[] { new { role = "user", parts = new[] { new { text = userPrompt } } } },
                generationConfig = new
                {
                    responseMimeType = "application/json",
                    responseJsonSchema = GeminiResponseSchemas.For<T>(),
                },
            });
            return message;
        }

        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(TimeSpan.FromSeconds(Math.Clamp(settings.TimeoutSeconds, 5, 120)));
        try
        {
            using var response = await SendWithRetryAsync(client, BuildRequest, timeout.Token);
            if (response.StatusCode == HttpStatusCode.TooManyRequests)
                throw new AiRateLimitException("Gemini's request quota was reached. Check the Google project's quota or try again later.");
            if (response.StatusCode is HttpStatusCode.Unauthorized or HttpStatusCode.Forbidden)
                throw new AiProviderUnavailableException("Gemini authentication failed. Check the API key and its project permissions on the backend.");
            if (response.StatusCode == HttpStatusCode.BadRequest)
                throw new AiProviderUnavailableException("Gemini rejected the request. Check the backend API key, model and request settings.");
            if (response.StatusCode == HttpStatusCode.NotFound)
                throw new AiProviderUnavailableException("The configured Gemini model is unavailable. Check Ai:Model on the backend.");
            if (response.StatusCode == HttpStatusCode.ServiceUnavailable)
                throw new AiProviderUnavailableException("Gemini is temporarily busy. Please try again shortly.");
            if (!response.IsSuccessStatusCode)
                throw new AiProviderUnavailableException($"Gemini returned status {(int)response.StatusCode}. Please try again later.");

            using var stream = await response.Content.ReadAsStreamAsync(timeout.Token);
            using var payload = await JsonDocument.ParseAsync(stream, cancellationToken: timeout.Token);
            if (!payload.RootElement.TryGetProperty("candidates", out var candidates)
                || candidates.ValueKind != JsonValueKind.Array || candidates.GetArrayLength() == 0)
                throw new AiInvalidResponseException("Gemini did not return a usable response. Try rephrasing the request. Nothing was saved.");
            var candidate = candidates[0];
            if (!candidate.TryGetProperty("finishReason", out var reason) || reason.GetString() != "STOP")
                throw new AiInvalidResponseException("Gemini could not complete the response. Please try again. Nothing was saved.");
            var parts = candidate.GetProperty("content").GetProperty("parts");
            var content = string.Concat(parts.EnumerateArray()
                .Where(part => !part.TryGetProperty("thought", out var thought) || thought.ValueKind != JsonValueKind.True)
                .Where(part => part.TryGetProperty("text", out _))
                .Select(part => part.GetProperty("text").GetString()));
            if (string.IsNullOrWhiteSpace(content))
                throw new AiInvalidResponseException("Gemini returned no text. Nothing was saved.");
            return validate(JsonSerializer.Deserialize<T>(content, JsonOptions));
        }
        catch (OperationCanceledException ex) when (!cancellationToken.IsCancellationRequested)
        {
            throw new AiProviderUnavailableException("The Gemini request timed out. Please try again.", ex);
        }
        catch (HttpRequestException ex)
        {
            throw new AiProviderUnavailableException("Gemini could not be reached. Check the backend's internet connection.", ex);
        }
        catch (IOException ex)
        {
            throw new AiProviderUnavailableException("The connection to Gemini was interrupted. Please try again.", ex);
        }
        catch (Exception ex) when (ex is JsonException or KeyNotFoundException or InvalidOperationException)
        {
            // Never forward raw provider errors, generated content or credentials to the browser.
            throw new AiInvalidResponseException("Gemini returned malformed data. Nothing was saved.", ex);
        }
    }

    /// <summary>Gemini's shared free tier intermittently answers with 503 under load.
    /// A couple of short retries turn most of those into a normal response.</summary>
    private static async Task<HttpResponseMessage> SendWithRetryAsync(
        HttpClient client, Func<HttpRequestMessage> buildRequest, CancellationToken cancellationToken)
    {
        for (var attempt = 0; ; attempt++)
        {
            var response = await client.SendAsync(buildRequest(), HttpCompletionOption.ResponseHeadersRead, cancellationToken);
            if (response.StatusCode != HttpStatusCode.ServiceUnavailable || attempt >= 4)
                return response;
            response.Dispose();
            await Task.Delay(TimeSpan.FromMilliseconds(800 * (attempt + 1)), cancellationToken);
        }
    }
}
