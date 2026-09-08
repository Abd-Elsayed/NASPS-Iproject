namespace Nasps.Api.Services;

public static class PasswordPolicy
{
    /// <summary>Mirrors the Angular password rules: 8+ chars, upper, lower, digit, special.</summary>
    public static bool IsValid(string? password, out string error)
    {
        password ??= string.Empty;
        if (password.Length < 8) { error = "Password must be at least 8 characters long."; return false; }
        if (!password.Any(char.IsUpper)) { error = "Password must contain an uppercase letter."; return false; }
        if (!password.Any(char.IsLower)) { error = "Password must contain a lowercase letter."; return false; }
        if (!password.Any(char.IsDigit)) { error = "Password must contain a number."; return false; }
        if (password.All(char.IsLetterOrDigit)) { error = "Password must contain a special character."; return false; }
        error = string.Empty;
        return true;
    }
}
