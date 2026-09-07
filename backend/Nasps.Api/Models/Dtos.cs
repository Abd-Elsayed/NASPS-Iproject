namespace Nasps.Api.Models.Dtos;

public record LoginRequest(string Role, string Identifier, string Password);

public record LoginResponse(bool Success, string Message, bool RequiresPasswordChange = false, string? Token = null);

public record ChangeFirstPasswordRequest(string Email, string NewPassword);

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
