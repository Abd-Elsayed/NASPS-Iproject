using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nasps.Api.Models.Dtos;
using Nasps.Api.Services;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/ai")]
[Authorize]
public sealed class AiController(IAiService aiService, ITraineeAiContextFactory contextFactory) : ControllerBase
{
    [HttpPost("learning-path/{traineeId:int}")]
    public async Task<IActionResult> LearningPath(int traineeId, AiContextRequestDto? request, CancellationToken cancellationToken)
    {
        if (User.IsInRole("trainee") && User.FindFirst("traineeId")?.Value != traineeId.ToString()) return Forbid();
        var context = await contextFactory.CreateAsync(traineeId, request?.Tasks, cancellationToken);
        if (context is null) return NotFound(new { message = "Trainee was not found." });
        return await ExecuteAsync(() => aiService.CreateLearningPathAsync(context, cancellationToken));
    }

    [HttpPost("generate-task")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> GenerateTask(GenerateTaskRequest request, CancellationToken cancellationToken)
    {
        var prompt = request.Prompt?.Trim() ?? string.Empty;
        if (prompt.Length is < 15 or > 1000) return BadRequest(new { message = "Describe the task in 15 to 1000 characters." });
        return await ExecuteAsync(() => aiService.GenerateTaskAsync(prompt, cancellationToken));
    }

    [HttpPost("trainee-insights/{traineeId:int}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> TraineeInsights(int traineeId, AiContextRequestDto? request, CancellationToken cancellationToken)
    {
        var context = await contextFactory.CreateAsync(traineeId, request?.Tasks, cancellationToken);
        if (context is null) return NotFound(new { message = "Trainee was not found." });
        return await ExecuteAsync(() => aiService.CreateTraineeInsightsAsync(context, cancellationToken));
    }

    private static async Task<IActionResult> ExecuteAsync<T>(Func<Task<T>> operation)
    {
        try { return new OkObjectResult(await operation()); }
        catch (AiNotConfiguredException exception) { return new ObjectResult(new { message = exception.Message }) { StatusCode = 503 }; }
        catch (AiRateLimitException exception) { return new ObjectResult(new { message = exception.Message }) { StatusCode = 429 }; }
        catch (AiInvalidResponseException exception) { return new ObjectResult(new { message = exception.Message }) { StatusCode = 502 }; }
        catch (AiProviderUnavailableException exception) { return new ObjectResult(new { message = exception.Message }) { StatusCode = 503 }; }
    }
}
