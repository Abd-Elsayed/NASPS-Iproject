using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Services;

public sealed class ConfiguredAiService(HttpClient httpClient, IOptions<AiProviderOptions> options) : IAiService
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web) { PropertyNameCaseInsensitive = true };
    private readonly AiProviderOptions settings = options.Value;

    public async Task<PersonalizedLearningPathDto> CreateLearningPathAsync(TraineeAiContextDto context, CancellationToken ct)
    {
        var taskProgressPercent = context.TotalTasks == 0
            ? 0
            : (int)Math.Round(context.CompletedTasks * 100d / context.TotalTasks);
        var result = await CallAsync<PersonalizedLearningPathDto>(
            "You are an evidence-based internship learning coach. Return valid JSON only. Never claim that the trainee completed, enrolled in, or studied a recommended course unless that fact exists in the supplied data.",
            $"Return summary, progressPercent, and 3-6 recommendations (order, title, description, reason, skills, difficulty, estimatedHours) for: {JsonSerializer.Serialize(context, JsonOptions)}. progressPercent must be {taskProgressPercent} and represents assigned internship task completion only, never course completion.",
            AiResponseValidator.Validate,
            ct);
        return result with { ProgressPercent = taskProgressPercent };
    }

    public Task<AiGeneratedTaskDto> GenerateTaskAsync(string prompt, CancellationToken ct) =>
        CallAsync<AiGeneratedTaskDto>("Design safe educational internship task drafts. Never save or assign anything. Return valid JSON only.",
            $"Return title, description, instructions, priority, difficulty, estimatedDuration, learningObjectives, expectedSkills, and acceptanceCriteria for: {JsonSerializer.Serialize(prompt)}", AiResponseValidator.Validate, ct);

    public Task<TraineeInsightsDto> CreateTraineeInsightsAsync(TraineeAiContextDto context, CancellationToken ct) =>
        CallAsync<TraineeInsightsDto>("Use supplied task evidence only. Do not infer protected or personal traits. Return valid JSON only.",
            $"Return summary, progressAssessment, strengths, areasForImprovement, recommendations, nextSteps, and attentionIndicators for: {JsonSerializer.Serialize(context, JsonOptions)}", AiResponseValidator.Validate, ct);

    private async Task<T> CallAsync<T>(string systemPrompt, string userPrompt, Func<T?, T> validate, CancellationToken cancellationToken)
    {
        EnsureConfigured();
        if (settings.Provider.Equals("Gemini", StringComparison.OrdinalIgnoreCase))
            return await GeminiAiTransport.CallAsync(httpClient, settings, systemPrompt, userPrompt, validate, cancellationToken);

        using var request = new HttpRequestMessage(HttpMethod.Post, new Uri(new Uri(EnsureSlash(settings.BaseUrl)), "chat/completions"));
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", settings.ApiKey);
        request.Content = JsonContent.Create(new { model = settings.Model, temperature = 0.2, response_format = new { type = "json_object" }, messages = new[] { new { role = "system", content = systemPrompt }, new { role = "user", content = userPrompt } } });
        using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
        timeout.CancelAfter(TimeSpan.FromSeconds(Math.Clamp(settings.TimeoutSeconds, 5, 120)));
        HttpResponseMessage response;
        try { response = await httpClient.SendAsync(request, timeout.Token); }
        catch (OperationCanceledException ex) when (!cancellationToken.IsCancellationRequested) { throw new AiProviderUnavailableException("The AI request timed out. Please try again.", ex); }
        catch (HttpRequestException ex) { throw new AiProviderUnavailableException("The AI provider is currently unavailable.", ex); }
        using (response)
        {
            if (response.StatusCode == HttpStatusCode.TooManyRequests) throw new AiRateLimitException("The AI request limit was reached. Please wait and try again.");
            if (!response.IsSuccessStatusCode) throw new AiProviderUnavailableException($"The AI provider returned status {(int)response.StatusCode}.");
            try
            {
                using var payload = await JsonDocument.ParseAsync(await response.Content.ReadAsStreamAsync(timeout.Token), cancellationToken: timeout.Token);
                var content = payload.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
                if (string.IsNullOrWhiteSpace(content)) throw new JsonException("AI content is empty.");
                return validate(JsonSerializer.Deserialize<T>(StripFence(content), JsonOptions));
            }
            catch (AiInvalidResponseException) { throw; }
            catch (Exception ex) when (ex is JsonException or KeyNotFoundException or InvalidOperationException) { throw new AiInvalidResponseException("The AI provider returned malformed data. Nothing was saved.", ex); }
        }
    }

    private void EnsureConfigured()
    {
        if (string.IsNullOrWhiteSpace(settings.ApiKey) || string.IsNullOrWhiteSpace(settings.Model) || string.IsNullOrWhiteSpace(settings.BaseUrl))
            throw new AiNotConfiguredException("AI is not configured. Set Ai__ApiKey, Ai__Model, and Ai__BaseUrl on the backend.");
        if (!Uri.TryCreate(settings.BaseUrl, UriKind.Absolute, out _)) throw new AiNotConfiguredException("The configured AI base URL is invalid.");
    }

    private static string EnsureSlash(string value) => value.EndsWith('/') ? value : value + "/";
    private static string StripFence(string value)
    {
        var text = value.Trim();
        if (!text.StartsWith("```", StringComparison.Ordinal)) return text;
        var firstLine = text.IndexOf('\n'); var lastFence = text.LastIndexOf("```", StringComparison.Ordinal);
        return firstLine >= 0 && lastFence > firstLine ? text[(firstLine + 1)..lastFence].Trim() : text;
    }
}
