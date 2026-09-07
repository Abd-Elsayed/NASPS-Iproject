using Microsoft.AspNetCore.Mvc;
using Nasps.Api.Models.Dtos;
using Nasps.Api.Services;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(AuthService auth, VerificationService verification) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var result = await auth.LoginAsync(request);
        return result.Success ? Ok(result) : Unauthorized(result);
    }

    [HttpPost("change-first-password")]
    public async Task<ActionResult<LoginResponse>> ChangeFirstPassword(ChangeFirstPasswordRequest request)
    {
        var result = await auth.ChangeFirstPasswordAsync(request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("otp/request")]
    public ActionResult RequestOtp(RequestOtpRequest request)
    {
        var code = verification.RequestCode(request.Destination);
        // Demo only: a real deployment sends `code` by email/SMS instead of returning it.
        return Ok(new { code });
    }

    [HttpPost("otp/verify")]
    public ActionResult VerifyOtp(VerifyOtpRequest request)
    {
        var result = verification.VerifyCode(request.Destination, request.Code);
        return result == VerificationResult.Verified
            ? Ok(new { verified = true })
            : BadRequest(new { verified = false, reason = result.ToString().ToLowerInvariant() });
    }
}
