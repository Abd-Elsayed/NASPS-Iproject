using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Services;

public class AuthService(NaspsDbContext db, IPasswordHasher<TraineeCredential> hasher)
{
    private const string AdminEmail = "admin@nasps.com";
    private const string AdminPassword = "Admin@123";

    public static string UsernameFor(int traineeId) => $"NASPS-T{traineeId:D3}";

    public static string TemporaryPasswordFor(int traineeId) => $"NASPS@T{traineeId:D3}";

    public async Task<LoginResponse> LoginAsync(LoginRequest request)
    {
        var identifier = request.Identifier.Trim().ToLowerInvariant();

        if (request.Role == "admin")
        {
            return identifier == AdminEmail && request.Password == AdminPassword
                ? new LoginResponse(true, "Welcome back, Admin.")
                : new LoginResponse(false, "The admin email or password is incorrect.");
        }

        var trainee = await db.Trainees.Include(t => t.Credential)
            .FirstOrDefaultAsync(t =>
                t.Email.ToLower() == identifier ||
                t.Id.ToString() == identifier ||
                t.Id == ParseTraineeId(identifier));

        if (trainee is null)
            return new LoginResponse(false, "No trainee account was found for this ID, username, or email.");

        var credential = trainee.Credential;
        if (credential is null)
            return new LoginResponse(false, "The trainee ID, username, or password is incorrect.");

        var result = hasher.VerifyHashedPassword(credential, credential.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return new LoginResponse(false, "The trainee ID, username, or password is incorrect.");

        if (credential.MustChangePassword)
            return new LoginResponse(true, "Create your private password to continue.", RequiresPasswordChange: true);

        return new LoginResponse(true, $"Welcome back, {trainee.Name}.");
    }

    public async Task<LoginResponse> ChangeFirstPasswordAsync(ChangeFirstPasswordRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var trainee = await db.Trainees.Include(t => t.Credential)
            .FirstOrDefaultAsync(t => t.Email.ToLower() == email);

        if (trainee?.Credential is null)
            return new LoginResponse(false, "The trainee account is no longer available.");

        trainee.Credential.PasswordHash = hasher.HashPassword(trainee.Credential, request.NewPassword);
        trainee.Credential.MustChangePassword = false;
        await db.SaveChangesAsync();

        return new LoginResponse(true, "Your password was created successfully.");
    }

    public async Task<TraineeAccessResponse> RegisterTraineeAsync(int traineeId)
    {
        var username = UsernameFor(traineeId);
        var temporaryPassword = TemporaryPasswordFor(traineeId);

        var credential = await db.Credentials.FindAsync(traineeId);
        if (credential is null)
        {
            credential = new TraineeCredential { TraineeId = traineeId, Username = username, MustChangePassword = true };
            db.Credentials.Add(credential);
        }

        credential.Username = username;
        credential.PasswordHash = hasher.HashPassword(credential, temporaryPassword);
        credential.MustChangePassword = true;
        await db.SaveChangesAsync();

        return new TraineeAccessResponse(traineeId, username, temporaryPassword);
    }

    private static int ParseTraineeId(string identifier) =>
        identifier.StartsWith("nasps-t") && int.TryParse(identifier.AsSpan(7), out var id) ? id : -1;
}
