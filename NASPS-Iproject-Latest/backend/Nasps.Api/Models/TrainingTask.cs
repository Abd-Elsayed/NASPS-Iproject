using System.Text.Json.Serialization;

namespace Nasps.Api.Models;

public enum TaskStatus
{
    Pending,

    [JsonStringEnumMemberName("In Progress")]
    InProgress,

    Completed,

    [JsonStringEnumMemberName("Needs Changes")]
    NeedsChanges,
}

public enum TaskPriority
{
    High,
    Medium,
    Low,
}

public class TrainingTask
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int TraineeId { get; set; }
    public User? Trainee { get; set; }
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public DateOnly DueDate { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.Pending;
    public string? Instructions { get; set; }

    public string? AttachmentName { get; set; }
    public string? AttachmentType { get; set; }
    public long? AttachmentSize { get; set; }

    public string? SubmissionName { get; set; }
    public string? SubmissionType { get; set; }
    public long? SubmissionSize { get; set; }

    public string? AdminReview { get; set; }
}
