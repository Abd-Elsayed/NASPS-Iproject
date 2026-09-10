using System.Net;
using System.Text;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Nasps.Api.Models.Dtos;
using Nasps.Api.Services;

var jsonOptions = new JsonSerializerOptions(JsonSerializerDefaults.Web);
var task = new AiGeneratedTaskDto("Build a form", "Build an accessible Angular form.",
    ["Create the form", "Validate input"], "Medium", "Beginner", "3 hours",
    ["Use Angular forms"], ["TypeScript"], ["Invalid input displays an error"]);
var recommendation = new LearningRecommendationDto(1, "Angular forms", "Practice form validation.",
    "Relevant to the internship program.", ["Angular"], "Beginner", 3);
var path = new PersonalizedLearningPathDto("Practice Angular fundamentals.", 50,
    [recommendation, recommendation with { Order = 2 }, recommendation with { Order = 3 }]);
var insights = new TraineeInsightsDto("Practice needs review.", "One task is complete.",
    ["Completes tasks"], [], ["Practice validation"], ["Build a form"], []);
var context = new TraineeAiContextDto(0, "Frontend Web Development", "Engineering", "Example University",
    2, 1, 1, 0, 0, 0,
    [new("Build a static page", "Create semantic HTML", "Medium", "Completed", "2026-09-08", "Good structure"),
     new("Build a form", "Use Angular form validation", "High", "In Progress", "2026-09-15", null)]);

if (args.Contains("--live"))
{
    var config = new ConfigurationBuilder()
        .AddUserSecrets(typeof(AiProviderOptions).Assembly, optional: true)
        .AddEnvironmentVariables().Build();
    var options = config.GetSection("Ai").Get<AiProviderOptions>() ?? new();
    // No prompts or credentials are printed, and no account/database is needed.
    Console.WriteLine($"Live provider: {options.Provider}; model: {options.Model}; key configured: {!string.IsNullOrWhiteSpace(options.ApiKey)}");
    using var client = new HttpClient(new HttpClientHandler { AllowAutoRedirect = false, UseCookies = false });
    var service = new ConfiguredAiService(client, Options.Create(options));
    var liveFailures = 0;
    await Live("learning path", async () => { var value = await service.CreateLearningPathAsync(context, default); Console.WriteLine($"  {value.Recommendations.Count} validated recommendations"); });
    await Live("task draft", async () => { var value = await service.GenerateTaskAsync("Create a beginner Angular task to practise email form validation.", default); Console.WriteLine($"  Valid draft: {value.Priority} / {value.Difficulty}"); });
    await Live("trainee insights", async () => { var value = await service.CreateTraineeInsightsAsync(context, default); Console.WriteLine($"  {value.Recommendations.Count} validated recommendations"); });
    return liveFailures == 0 ? 0 : 1;

    async Task Live(string name, Func<Task> action)
    {
        try { await action(); Console.WriteLine($"PASS live {name}"); }
        catch (AiServiceException exception) { liveFailures++; Console.WriteLine($"FAIL live {name}: {exception.Message}"); }
        catch (Exception exception) { liveFailures++; Console.WriteLine($"FAIL live {name}: {exception.GetType().Name}"); }
    }
}

var passed = 0;
var failed = 0;
await Check("Gemini request and task schema", async () =>
{
    using var handler = Reply(async request =>
    {
        Assert(request.RequestUri!.AbsoluteUri == "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent", "wrong endpoint");
        Assert(!request.RequestUri.Query.Contains("key"), "key in URL");
        Assert(request.Headers.GetValues("x-goog-api-key").Single() == "test-key-not-real", "missing key header");
        Assert(request.Headers.Authorization is null, "Gemini must not use Bearer auth");
        using var body = JsonDocument.Parse(await request.Content!.ReadAsStringAsync());
        Assert(body.RootElement.GetProperty("systemInstruction").GetProperty("parts")[0].GetProperty("text").GetString()!.Contains("Never save or assign"), "missing system instruction");
        Assert(body.RootElement.GetProperty("contents")[0].GetProperty("role").GetString() == "user", "missing user prompt");
        var generation = body.RootElement.GetProperty("generationConfig");
        Assert(generation.GetProperty("responseMimeType").GetString() == "application/json", "wrong response format");
        var schema = generation.GetProperty("responseJsonSchema");
        Assert(schema.GetProperty("required").GetArrayLength() == 9, "wrong task schema");
        Assert(schema.GetProperty("properties").GetProperty("priority").GetProperty("enum").GetArrayLength() == 3, "priority enum omitted");
        return GeminiReply(task);
    });
    var result = await Service(handler).GenerateTaskAsync("Build an Angular form", default);
    Assert(result.Title == task.Title, "task parsing failed");
});
await Check("Learning path schema and parsing", async () =>
{
    using var handler = SchemaReply("recommendations", path);
    var result = await Service(handler).CreateLearningPathAsync(context, default);
    Assert(result.Recommendations.Count == 3, "missing recommendations");
});
await Check("Insights schema and parsing", async () =>
{
    using var handler = SchemaReply("progressAssessment", insights);
    var result = await Service(handler).CreateTraineeInsightsAsync(context, default);
    Assert(result.NextSteps.Count == 1, "missing next steps");
});
await Check("Original OpenAI-compatible branch preserved", async () =>
{
    using var handler = Reply(async request =>
    {
        Assert(request.RequestUri!.AbsoluteUri == "https://api.openai.com/v1/chat/completions", "legacy URL changed");
        Assert(request.Headers.Authorization?.Scheme == "Bearer", "legacy authentication changed");
        using var body = JsonDocument.Parse(await request.Content!.ReadAsStringAsync());
        Assert(body.RootElement.GetProperty("messages").GetArrayLength() == 2, "legacy prompt changed");
        return JsonReply(new { choices = new[] { new { message = new { content = JsonSerializer.Serialize(task, jsonOptions) } } } });
    });
    var result = await Service(handler, new() { ApiKey = "test-key-not-real", Model = "existing-model" }).GenerateTaskAsync("Build an Angular form", default);
    Assert(result.Title == task.Title, "legacy parsing changed");
});
foreach (var status in new[] { 400, 401, 403, 404, 429, 503, 500, 302 })
{
    await Check($"Provider HTTP {status} becomes a safe error", async () =>
    {
        using var handler = Reply(_ => Task.FromResult(new HttpResponseMessage((HttpStatusCode)status) { Content = new StringContent("DO_NOT_EXPOSE_PROVIDER_BODY") }));
        try { await Service(handler).GenerateTaskAsync("Build an Angular form", default); throw new Exception("expected rejection"); }
        catch (AiServiceException exception)
        {
            Assert(!exception.Message.Contains("DO_NOT_EXPOSE") && !exception.Message.Contains("test-key-not-real"), "secret/error leaked");
            Assert(status == 429 ? exception is AiRateLimitException : exception is AiProviderUnavailableException, "wrong exception type");
        }
    });
}
foreach (var body in new[]
{
    "not json", "{}", "{\"candidates\":[]}",
    "{\"candidates\":[{\"finishReason\":\"SAFETY\"}]}",
    "{\"candidates\":[{\"finishReason\":\"MAX_TOKENS\"}]}",
    "{\"candidates\":[{\"finishReason\":\"STOP\",\"content\":{\"parts\":[{\"text\":\"{}\"}]}}]}"
})
{
    await Check("Malformed, blocked or incomplete output rejected", async () =>
    {
        using var handler = Reply(_ => Task.FromResult(new HttpResponseMessage(HttpStatusCode.OK) { Content = new StringContent(body) }));
        await Throws<AiInvalidResponseException>(() => Service(handler).GenerateTaskAsync("Build an Angular form", default));
    });
}
await Check("Null recommendation rejected safely", async () =>
{
    using var handler = Reply(_ => Task.FromResult(GeminiReply(new { summary = "Summary", progressPercent = 0, recommendations = new object?[] { null } })));
    await Throws<AiInvalidResponseException>(() => Service(handler).CreateLearningPathAsync(context, default));
});
await Check("Thought parts are not parsed as output", async () =>
{
    using var handler = Reply(_ => Task.FromResult(JsonReply(new { candidates = new[] { new { finishReason = "STOP", content = new { parts = new[] { new { thought = true, text = "not JSON reasoning" }, new { thought = false, text = JsonSerializer.Serialize(task, jsonOptions) } } } } } })));
    Assert((await Service(handler).GenerateTaskAsync("Build an Angular form", default)).Title == task.Title, "thought text leaked into JSON");
});
await Check("Untrusted Gemini host rejected before sending", async () =>
{
    using var handler = Reply(_ => throw new Exception("must not send credentials"));
    var options = GeminiOptions(); options.BaseUrl = "https://untrusted.invalid/v1beta/";
    await Throws<AiNotConfiguredException>(() => Service(handler, options).GenerateTaskAsync("Build an Angular form", default));
});
await Check("Invalid Gemini model rejected before sending", async () =>
{
    using var handler = Reply(_ => throw new Exception("must not send credentials"));
    var options = GeminiOptions(); options.Model = "../other?key=anything";
    await Throws<AiNotConfiguredException>(() => Service(handler, options).GenerateTaskAsync("Build an Angular form", default));
});
await Check("Missing key rejected before sending", async () =>
{
    using var handler = Reply(_ => throw new Exception("must not send credentials"));
    var options = GeminiOptions(); options.ApiKey = "";
    await Throws<AiNotConfiguredException>(() => Service(handler, options).GenerateTaskAsync("Build an Angular form", default));
});
await Check("Network failure is handled", async () =>
{
    using var handler = Reply(_ => throw new HttpRequestException("offline"));
    await Throws<AiProviderUnavailableException>(() => Service(handler).GenerateTaskAsync("Build an Angular form", default));
});
await Check("Provider timeout is handled", async () =>
{
    using var handler = Reply(_ => throw new TaskCanceledException());
    await Throws<AiProviderUnavailableException>(() => Service(handler).GenerateTaskAsync("Build an Angular form", default));
});
await Check("Caller cancellation stays cancellation", async () =>
{
    using var handler = Reply(_ => throw new TaskCanceledException());
    using var cancellation = new CancellationTokenSource(); cancellation.Cancel();
    await Throws<OperationCanceledException>(() => Service(handler).GenerateTaskAsync("Build an Angular form", cancellation.Token));
});
Console.WriteLine($"{passed} checks passed; {failed} failed.");
return failed == 0 ? 0 : 1;

ConfiguredAiService Service(HttpMessageHandler handler, AiProviderOptions? options = null) =>
    new(new HttpClient(handler), Options.Create(options ?? GeminiOptions()));
AiProviderOptions GeminiOptions() => new() { Provider = "Gemini", BaseUrl = "https://generativelanguage.googleapis.com/v1beta/", Model = "gemini-flash-latest", ApiKey = "test-key-not-real" };
HttpResponseMessage JsonReply(object value) => new(HttpStatusCode.OK) { Content = new StringContent(JsonSerializer.Serialize(value, jsonOptions), Encoding.UTF8, "application/json") };
HttpResponseMessage GeminiReply(object value) => JsonReply(new { candidates = new[] { new { finishReason = "STOP", content = new { parts = new[] { new { text = JsonSerializer.Serialize(value, jsonOptions) } } } } } });
FakeHandler Reply(Func<HttpRequestMessage, Task<HttpResponseMessage>> action) => new(action);
FakeHandler SchemaReply(string property, object value) => Reply(async request =>
{
    using var body = JsonDocument.Parse(await request.Content!.ReadAsStringAsync());
    Assert(body.RootElement.GetProperty("generationConfig").GetProperty("responseJsonSchema").GetProperty("properties").TryGetProperty(property, out _), "wrong response schema");
    return GeminiReply(value);
});
async Task Check(string name, Func<Task> action)
{
    try { await action(); passed++; Console.WriteLine($"PASS {name}"); }
    catch (Exception exception) { failed++; Console.WriteLine($"FAIL {name}: {exception.Message}"); }
}
static void Assert(bool condition, string message) { if (!condition) throw new Exception(message); }
static async Task Throws<T>(Func<Task> action) where T : Exception
{
    try { await action(); } catch (T) { return; }
    throw new Exception($"Expected {typeof(T).Name}");
}
sealed class FakeHandler(Func<HttpRequestMessage, Task<HttpResponseMessage>> action) : HttpMessageHandler
{
    protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken) => action(request);
}
