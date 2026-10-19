namespace Nasps.Api.Models;

public enum TraineeStatus
{
    Active,
    Inactive,
}

public enum UserRole
{
    Trainee,
    Admin,
    SuperAdmin,
}

/// <summary>
/// Single account table for every person in the system. <see cref="Role"/> tells an
/// admin from a trainee; <see cref="Department"/> scopes a department admin's view.
/// The trainee-profile fields below are left at their defaults for admin rows.
/// </summary>
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public UserRole Role { get; set; } = UserRole.Trainee;
    public string Department { get; set; } = string.Empty;

    // Authentication
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool MustChangePassword { get; set; }
    public bool EmailVerified { get; set; }

    // Stored server-side so the same photo is available on every page/device.
    public string? ProfilePhotoName { get; set; }
    public string? ProfilePhotoType { get; set; }
    public byte[]? ProfilePhotoContent { get; set; }

    // Trainee profile (unused for admin rows)
    public string InternshipProgram { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string University { get; set; } = string.Empty;
    public DateOnly JoinDate { get; set; }
    public TraineeStatus Status { get; set; } = TraineeStatus.Active;
}
