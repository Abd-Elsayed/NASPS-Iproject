using System.Collections.Concurrent;
using System.Security.Cryptography;

namespace Nasps.Api.Services;

public enum VerificationResult
{
    Verified,
    Invalid,
    Expired,
}

public class VerificationService
{
    private record VerificationEntry(string Code, DateTime ExpiresAtUtc);

    private readonly ConcurrentDictionary<string, VerificationEntry> _requests = new();

    /// <summary>
    /// Returns a 6-digit code for the destination. If an unexpired code was already issued
    /// it is reused, so a failed login or a "resend" click never invalidates a code the
    /// user is currently typing.
    /// </summary>
    public string RequestCode(string destination)
    {
        var key = Key(destination);
        if (_requests.TryGetValue(key, out var existing) && DateTime.UtcNow <= existing.ExpiresAtUtc)
            return existing.Code;

        var code = RandomNumberGenerator.GetInt32(100_000, 1_000_000).ToString();
        _requests[key] = new VerificationEntry(code, DateTime.UtcNow.AddMinutes(5));
        return code;
    }

    public VerificationResult VerifyCode(string destination, string code)
    {
        var key = Key(destination);
        if (!_requests.TryGetValue(key, out var entry)) return VerificationResult.Invalid;

        if (DateTime.UtcNow > entry.ExpiresAtUtc)
        {
            _requests.TryRemove(key, out _);
            return VerificationResult.Expired;
        }

        if (entry.Code != code.Trim()) return VerificationResult.Invalid;

        _requests.TryRemove(key, out _);
        return VerificationResult.Verified;
    }

    private static string Key(string destination) => destination.Trim().ToLowerInvariant();
}
