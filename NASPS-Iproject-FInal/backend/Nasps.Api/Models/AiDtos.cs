namespace Nasps.Api.Models.Dtos;

public sealed record GenerateTaskRequest(string Prompt);
public sealed record LearningRecommendationDto(int Order, string Title, string Description, string Reason, IReadOnlyList<string> Skills, string Difficulty, int EstimatedHours);
public sealed record PersonalizedLearningPathDto(string Summary, int ProgressPercent, IReadOnlyList<LearningRecommendationDto> Recommendations);
public sealed record AiGeneratedTaskDto(string Title, string Description, IReadOnlyList<string> Instructions, string Priority, string Difficulty, string EstimatedDuration, IReadOnlyList<string> LearningObjectives, IReadOnlyList<string> ExpectedSkills, IReadOnlyList<string> AcceptanceCriteria);
public sealed record TraineeInsightsDto(string Summary, string ProgressAssessment, IReadOnlyList<string> Strengths, IReadOnlyList<string> AreasForImprovement, IReadOnlyList<string> Recommendations, IReadOnlyList<string> NextSteps, IReadOnlyList<string> AttentionIndicators);
public sealed record AiTaskContextDto(string Title, string Description, string Priority, string Status, string DueDate, string? AdminReview);
public sealed record AiContextRequestDto(IReadOnlyList<AiTaskContextDto>? Tasks);
public sealed record TraineeAiContextDto(int TraineeId, string InternshipProgram, string Department, string University, int TotalTasks, int CompletedTasks, int InProgressTasks, int PendingTasks, int NeedsChangesTasks, int OverdueTasks, IReadOnlyList<AiTaskContextDto> Tasks);
