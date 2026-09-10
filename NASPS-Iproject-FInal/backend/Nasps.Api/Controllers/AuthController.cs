using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Nasps.Api.Models.Dtos;
using Nasps.Api.Services;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(AuthService auth, VerificationService verification, EmailOtpService otp) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
    {
        var result = await auth.LoginAsync(request);

        // The account-creation email already contains the code. Do not generate a second
        // code here: the verification page has an explicit resend action if it expired.
        if (result is { Success: false, RequiresEmailVerification: true, Email: not null })
            return Unauthorized(result);

        return result.Success ? Ok(result) : Unauthorized(result);
    }

    [HttpPost("register")]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<RegisterAdminResponse>> Register(RegisterAdminRequest request)
    {
        // Administrator accounts are provisioned only by a signed-in Super Admin.
        // A department admin provisions trainees through /api/trainees instead.
        if (!CallerContext.From(User).IsSuperAdmin) return Forbid();

        var (ok, message, user) = await auth.RegisterAdminAsync(request);
        if (!ok || user is null)
            return BadRequest(new RegisterAdminResponse(false, message));

        try
        {
            var code = await otp.SendCodeAsync(user.Email, user.Name, "account verification");
            return Ok(new RegisterAdminResponse(true, message, user.Email, otp.ExposeCodes ? code : null));
        }
        catch
        {
            // A failed delivery must not leave an unusable address reserved in the DB.
            await auth.RemoveUnverifiedAccountAsync(user.Id);
            throw;
        }
    }

    [HttpPost("verify-email")]
    public async Task<ActionResult> VerifyEmail(VerifyEmailRequest request)
    {
        var email = request.Email.Trim();
        var result = otp.Verify(email, request.Code);
        if (result != VerificationResult.Verified)
        {
            var reason = result == VerificationResult.Expired
                ? "The verification code expired. Request a new one."
                : "The verification code is incorrect.";
            return BadRequest(new { success = false, message = reason });
        }

        var login = await auth.CompleteEmailVerificationAsync(email);
        if (login is null)
            return NotFound(new { success = false, message = "No account was found for this email." });

        return Ok(login);
    }

    [HttpPost("resend-verification")]
    public async Task<ActionResult> ResendVerification(ResendVerificationRequest request)
    {
        var user = await auth.GetByEmailAsync(request.Email);
        // Always answer the same way so the endpoint can't be used to probe for accounts.
        if (user is not null && !user.EmailVerified)
        {
            var code = await otp.SendCodeAsync(user.Email, user.Name, "account verification");
            if (otp.ExposeCodes)
                return Ok(new { success = true, message = "A new verification code was sent.", devCode = code });
        }
        return Ok(new { success = true, message = "If the account exists and is unverified, a new code was sent." });
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<MeDto>> Me()
    {
        var user = await auth.GetByIdAsync(CurrentUserId);
        return user is null ? NotFound() : Ok(MeDto.From(user));
    }

    [HttpPut("me")]
    [Authorize]
    public async Task<ActionResult<MeDto>> UpdateMe(UpdateMeRequest request)
    {
        var user = await auth.UpdateSelfAsync(CurrentUserId, request);
        return user is null ? NotFound() : Ok(MeDto.From(user));
    }

    [HttpGet("me/photo")]
    [Authorize]
    public async Task<IActionResult> GetMyPhoto()
    {
        var user = await auth.GetByIdAsync(CurrentUserId);
        if (user?.ProfilePhotoContent is not { Length: > 0 }) return NotFound();
        return File(user.ProfilePhotoContent, user.ProfilePhotoType ?? "application/octet-stream",
            user.ProfilePhotoName ?? "profile-photo");
    }

    [HttpPost("me/photo")]
    [Authorize]
    [RequestSizeLimit(2 * 1024 * 1024)]
    public async Task<ActionResult> UploadMyPhoto([FromForm] IFormFile photo)
    {
        if (photo.Length == 0) return BadRequest(new { message = "Choose a non-empty image." });
        if (photo.Length > 2 * 1024 * 1024)
            return BadRequest(new { message = "Profile photo must be 2 MB or smaller." });
        if (!photo.ContentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase))
            return BadRequest(new { message = "Profile photo must be an image. PDF and document files are not accepted." });

        return await auth.UpdateProfilePhotoAsync(CurrentUserId, photo)
            ? Ok(new { success = true })
            : NotFound();
    }

    [HttpDelete("me/photo")]
    [Authorize]
    public async Task<IActionResult> RemoveMyPhoto() =>
        await auth.RemoveProfilePhotoAsync(CurrentUserId) ? NoContent() : NotFound();

    private int CurrentUserId =>
        int.TryParse(User.FindFirst("sub")?.Value, out var id) ? id : -1;

    [HttpPost("change-first-password")]
    [Authorize(Roles = "trainee")]
    public async Task<ActionResult<LoginResponse>> ChangeFirstPassword(ChangeFirstPasswordRequest request)
    {
        var tokenEmail = User.FindFirst(JwtRegisteredClaimNames.Email)?.Value ?? User.FindFirst(ClaimTypes.Email)?.Value;
        if (!string.Equals(tokenEmail, request.Email, StringComparison.OrdinalIgnoreCase)) return Forbid();
        var result = await auth.ChangeFirstPasswordAsync(request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("forgot-password/request")]
    public async Task<ActionResult> RequestPasswordReset(ForgotPasswordRequest request)
    {
        var user = await auth.GetByEmailAsync(request.Email);
        if (user is null)
            return NotFound(new { success = false, message = "No admin or trainee account was found for this email." });

        var code = await otp.SendCodeAsync(user.Email, user.Name, "password reset");
        return Ok(new
        {
            success = true,
            message = "A password reset code was sent to your registered email.",
            code = otp.ExposeCodes ? code : null,
        });
    }

    [HttpPost("forgot-password/reset")]
    public async Task<ActionResult<LoginResponse>> ResetPassword(ResetPasswordRequest request)
    {
        var verificationResult = verification.VerifyCode(request.Email, request.Code);
        if (verificationResult != VerificationResult.Verified)
        {
            var message = verificationResult == VerificationResult.Expired
                ? "The reset code expired. Request a new one."
                : "The reset code is incorrect.";
            return BadRequest(new LoginResponse(false, message));
        }
        var result = await auth.ResetPasswordAsync(request);
        return result.Success ? Ok(result) : BadRequest(result);
    }

    [HttpPost("otp/request")]
    public async Task<ActionResult> RequestOtp(RequestOtpRequest request)
    {
        var code = await otp.SendCodeAsync(request.Destination, request.Destination, "verification");
        return Ok(new { success = true, message = "A verification code was sent.", code = otp.ExposeCodes ? code : null });
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
