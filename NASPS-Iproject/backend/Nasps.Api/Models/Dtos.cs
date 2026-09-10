namespace Nasps.Api.Models.Dtos;

public record LoginRequest(string Identifier, string Password, string? Role = null);

public record LoginResponse(
    bool Success,
    string Message,
    bool RequiresPasswordChange = false,
    string? Token = null,
    string? Role = null,
    int? TraineeId = null,
    string? Email = null,
    string? Department = null,
    bool RequiresEmailVerification = false
);

public record RegisterAdminRequest(string Name, string Email, string Password, string Department);

public record RegisterAdminResponse(bool Success, string Message, string? Email = null, string? DevCode = null);

public record VerifyEmailRequest(string Email, string Code);

public record ResendVerificationRequest(string Email);

/// <summary>The signed-in user's own profile.</summary>
public record MeDto(
    int Id,
    string Name,
    string Email,
    string Role,
    string RoleName,
    string Department,
    string Phone,
    string University,
    string InternshipProgram,
    DateOnly JoinDate,
    string Status,
    bool EmailVerified,
    bool MustChangePassword,
    bool HasProfilePhoto
)
{
    public static MeDto From(User u) => new(
        u.Id, u.Name, u.Email,
        u.Role == UserRole.Trainee ? "trainee" : "admin",
        u.Role.ToString(), u.Department, u.Phone, u.University, u.InternshipProgram,
        u.JoinDate, u.Status.ToString(), u.EmailVerified, u.MustChangePassword,
        u.ProfilePhotoContent is { Length: > 0 });
}

public record UpdateMeRequest(string Name, string Phone, string? University = null);

public record ChangeFirstPasswordRequest(string Email, string NewPassword);

public record ForgotPasswordRequest(string Email);

public record ResetPasswordRequest(string Email, string Code, string NewPassword);

public record TraineeAccessResponse(int TraineeId, string Username, string TemporaryPassword);

public record RequestOtpRequest(string Destination);

public record VerifyOtpRequest(string Destination, string Code);

public record CreateTraineeRequest(
    string Name,
    string Email,
    string InternshipProgram,
    string Phone,
    string Department,
    string University
);

public record UpdateTraineeRequest(
    string Name,
    string Email,
    string InternshipProgram,
    string Phone,
    string Department,
    string University,
    TraineeStatus Status
);

public record CreateTaskRequest(
    string Title,
    string Description,
    int TraineeId,
    TaskPriority Priority,
    DateOnly DueDate,
    string? Instructions = null,
    string? Attachment = null,
    string? AttachmentType = null,
    long? AttachmentSize = null
);

/// <summary>Partial update: only non-null members are applied. The Clear* flags null a field.</summary>
public record TaskUpdateRequest(
    string? Title = null,
    string? Description = null,
    TaskPriority? Priority = null,
    DateOnly? DueDate = null,
    TaskStatus? Status = null,
    string? Instructions = null,
    string? Attachment = null,
    string? AttachmentType = null,
    long? AttachmentSize = null,
    string? Submission = null,
    string? SubmissionName = null,
    string? SubmissionType = null,
    long? SubmissionSize = null,
    string? AdminReview = null,
    bool ClearAttachment = false,
    bool ClearSubmission = false
);

/// <summary>Task shape exchanged with the Angular client (uses its field names).</summary>
public record TaskDto(
    int Id,
    string Title,
    string Description,
    int TraineeId,
    TaskPriority Priority,
    DateOnly DueDate,
    TaskStatus Status,
    string? Instructions,
    string? Attachment,
    string? AttachmentType,
    long? AttachmentSize,
    string? Submission,
    string? SubmissionName,
    string? SubmissionType,
    long? SubmissionSize,
    string? AdminReview
)
{
    public static TaskDto From(TrainingTask t) => new(
        t.Id, t.Title, t.Description, t.TraineeId, t.Priority, t.DueDate, t.Status, t.Instructions,
        t.AttachmentName, t.AttachmentType, t.AttachmentSize,
        t.SubmissionLink ?? t.SubmissionName, t.SubmissionName, t.SubmissionType, t.SubmissionSize,
        t.AdminReview);
}

/// <summary>Trainee shape returned to the Angular client (never exposes password/role fields).</summary>
public record TraineeDto(
    int Id,
    string Name,
    string Email,
    string InternshipProgram,
    string Phone,
    string Department,
    string University,
    DateOnly JoinDate,
    TraineeStatus Status,
    bool EmailVerified
)
{
    public static TraineeDto From(User u) => new(
        u.Id, u.Name, u.Email, u.InternshipProgram, u.Phone, u.Department, u.University, u.JoinDate, u.Status, u.EmailVerified);
}
