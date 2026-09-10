using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Services;

public interface IAiService
{
    Task<PersonalizedLearningPathDto> CreateLearningPathAsync(TraineeAiContextDto context, CancellationToken cancellationToken);
    Task<AiGeneratedTaskDto> GenerateTaskAsync(string prompt, CancellationToken cancellationToken);
    Task<TraineeInsightsDto> CreateTraineeInsightsAsync(TraineeAiContextDto context, CancellationToken cancellationToken);
}

public interface ITraineeAiContextFactory
{
    Task<TraineeAiContextDto?> CreateAsync(int traineeId, IReadOnlyList<AiTaskContextDto>? currentTasks, CancellationToken cancellationToken);
}
