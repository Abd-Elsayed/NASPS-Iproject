using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Services;

public class AuthService(
    NaspsDbContext db,
    IPasswordHasher<User> hasher,
    TokenService tokens)
{
    /// <summary>An email belongs to a NASPS admin when it contains "@nasps".</summary>
    public static bool IsAdminEmail(string email) =>
        email.Contains("@nasps", StringComparison.OrdinalIgnoreCase);

    public static string UsernameFor(int traineeId) => $"NASPS-T{traineeId:D3}";

    public static string TemporaryPasswordFor(int traineeId) => $"NASPS@T{traineeId:D3}";

    public Task<User?> GetByEmailAsync(string email)
    {
        var normalized = email.Trim().ToLowerInvariant();
        return db.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == normalized);
    }

    public Task<User?> GetByIdAsync(int id) => db.Users.FirstOrDefaultAsync(u => u.Id == id);

    public async Task RemoveUnverifiedAccountAsync(int id)
    {
        var user = await db.Users.FirstOrDefaultAsync(u => u.Id == id && !u.EmailVerified);
        if (user is null) return;
        db.Users.Remove(user);
        await db.SaveChangesAsync();
    }

    public async Task<User?> UpdateSelfAsync(int id, UpdateMeRequest request)
    {
        var user = await GetByIdAsync(id);
        if (user is null) return null;
        if (!string.IsNullOrWhiteSpace(request.Name)) user.Name = request.Name.Trim();
        user.Phone = request.Phone?.Trim() ?? user.Phone;
        if (user.Role == UserRole.Trainee && request.University is not null)
            user.University = request.University.Trim();
        await db.SaveChangesAsync();
        return user;
    }

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var identifier = request.Identifier.Trim().ToLowerInvariant();

        var user = await db.Users.FirstOrDefaultAsync(u =>
            u.Email.ToLower() == identifier ||
            u.Username.ToLower() == identifier ||
            u.Id.ToString() == identifier ||
            u.Id == ParseTraineeId(identifier));

        if (user is null)
            return new LoginResponse(false, "No account was found for this ID, username, or email.");

        var result = hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return new LoginResponse(false, "The ID, username, email, or password is incorrect.");

        if (!user.EmailVerified)
            return new LoginResponse(false,
                "Verify your email address to continue. Use the code sent when your account was created, or request a new one.",
                RequiresEmailVerification: true, Email: user.Email);

        if (user.Role == UserRole.Trainee && user.MustChangePassword)
            return Success(user, "Create your private password to continue.", requiresPasswordChange: true);

        return Success(user, $"Welcome back, {user.Name}.");
    }

    public async Task<(bool Ok, string Message, User? User)> RegisterAdminAsync(RegisterAdminRequest request)
    {
        var name = request.Name.Trim();
        var email = request.Email.Trim();
        var department = request.Department.Trim();

        if (string.IsNullOrWhiteSpace(name))
            return (false, "Enter your full name.", null);
        if (!IsAdminEmail(email))
            return (false, "Admin accounts must use a NASPS email address (it must contain \"@nasps\").", null);
        if (string.IsNullOrWhiteSpace(department))
            return (false, "Choose your department.", null);
        if (!PasswordPolicy.IsValid(request.Password, out var passwordError))
            return (false, passwordError, null);
        if (await db.Users.AnyAsync(u => u.Email.ToLower() == email.ToLowerInvariant()))
            return (false, "An account with this email already exists.", null);

        var user = new User
        {
            Name = name,
            Email = email,
            Username = email,
            Role = UserRole.Admin,
            Department = department,
            EmailVerified = false,
            MustChangePassword = false,
        };
        user.PasswordHash = hasher.HashPassword(user, request.Password);
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return (true, "Account created. Check your email for the verification code.", user);
    }

    public async Task<bool> MarkEmailVerifiedAsync(string email)
    {
        var user = await GetByEmailAsync(email);
        if (user is null) return false;
        user.EmailVerified = true;
        if (user.Role == UserRole.Trainee)
            user.Status = TraineeStatus.Active;
        await db.SaveChangesAsync();
        return true;
    }

    /// <summary>
    /// The email OTP proves control of the mailbox, so issue the normal signed session
    /// immediately. A trainee with the one-time password is sent straight to Create Password.
    /// </summary>
    public async Task<LoginResponse?> CompleteEmailVerificationAsync(string email)
    {
        var user = await GetByEmailAsync(email);
        if (user is null) return null;
        user.EmailVerified = true;
        if (user.Role == UserRole.Trainee)
            user.Status = TraineeStatus.Active;
        await db.SaveChangesAsync();

        var needsPassword = user.Role == UserRole.Trainee && user.MustChangePassword;
        var message = needsPassword
            ? "Email verified. Create your private password to continue."
            : "Your email is verified. Welcome to NASPS.";
        return Success(user, message, needsPassword);
    }

    public async Task<LoginResponse> ChangeFirstPasswordAsync(ChangeFirstPasswordRequest request)
    {
        var user = await GetByEmailAsync(request.Email);
        if (user is null)
            return new LoginResponse(false, "The account is no longer available.");
        if (!user.EmailVerified)
            return new LoginResponse(false, "Verify your email before creating a password.");
        if (!PasswordPolicy.IsValid(request.NewPassword, out var passwordError))
            return new LoginResponse(false, passwordError);

        user.PasswordHash = hasher.HashPassword(user, request.NewPassword);
        user.MustChangePassword = false;
        await db.SaveChangesAsync();

        return Success(user, "Your password was created successfully.");
    }

    public async Task<bool> UpdateProfilePhotoAsync(int id, IFormFile photo)
    {
        var user = await GetByIdAsync(id);
        if (user is null) return false;
        await using var stream = new MemoryStream();
        await photo.CopyToAsync(stream);
        user.ProfilePhotoName = Path.GetFileName(photo.FileName);
        user.ProfilePhotoType = photo.ContentType;
        user.ProfilePhotoContent = stream.ToArray();
        await db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveProfilePhotoAsync(int id)
    {
        var user = await GetByIdAsync(id);
        if (user is null) return false;
        user.ProfilePhotoName = null;
        user.ProfilePhotoType = null;
        user.ProfilePhotoContent = null;
        await db.SaveChangesAsync();
        return true;
    }

    public async Task<bool> AccountExistsAsync(string email)
    {
        var normalized = email.Trim().ToLowerInvariant();
        return await db.Users.AnyAsync(u => u.Email.ToLower() == normalized);
    }

    public async Task<LoginResponse> ResetPasswordAsync(ResetPasswordRequest request)
    {
        var user = await GetByEmailAsync(request.Email);
        if (user is null)
            return new LoginResponse(false, "The account is no longer available.");
        if (!PasswordPolicy.IsValid(request.NewPassword, out var passwordError))
            return new LoginResponse(false, passwordError);

        user.PasswordHash = hasher.HashPassword(user, request.NewPassword);
        user.MustChangePassword = false;
        user.EmailVerified = true; // proving control of the mailbox also verifies it
        if (user.Role == UserRole.Trainee) user.Status = TraineeStatus.Active;
        await db.SaveChangesAsync();
        return new LoginResponse(true, "Your password was reset successfully. You can now sign in.");
    }

    /// <summary>Assigns (or re-assigns) the generated username + one-time password to a trainee row.</summary>
    public async Task<TraineeAccessResponse> RegisterTraineeAsync(int traineeId)
    {
        var user = await db.Users.FindAsync(traineeId)
            ?? throw new InvalidOperationException($"Trainee {traineeId} was not found.");

        var username = UsernameFor(traineeId);
        var temporaryPassword = TemporaryPasswordFor(traineeId);

        user.Username = username;
        user.PasswordHash = hasher.HashPassword(user, temporaryPassword);
        user.MustChangePassword = true;
        await db.SaveChangesAsync();

        return new TraineeAccessResponse(traineeId, username, temporaryPassword);
    }

    private LoginResponse Success(User user, string message, bool requiresPasswordChange = false) => new(
        Success: true,
        Message: message,
        RequiresPasswordChange: requiresPasswordChange,
        Token: tokens.CreateToken(user),
        Role: user.Role == UserRole.Trainee ? "trainee" : "admin",
        TraineeId: user.Role == UserRole.Trainee ? user.Id : null,
        Email: user.Email,
        Department: user.Department);

    private static int ParseTraineeId(string identifier) =>
        identifier.StartsWith("nasps-t") && int.TryParse(identifier.AsSpan(7), out var id) ? id : -1;
}
