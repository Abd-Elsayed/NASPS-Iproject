using System.Net;
using Nasps.Api.Services.Email;

namespace Nasps.Api.Services;

/// <summary>Generates a one-time code, stores it in <see cref="VerificationService"/>, and emails it.</summary>
public class EmailOtpService(
    VerificationService verification,
    IEmailSender email,
    IHostEnvironment environment,
    ILogger<EmailOtpService> logger)
{
    /// <summary>In Development the code is also returned to the caller so the flow is testable without a mailbox.</summary>
    public bool ExposeCodes => environment.IsDevelopment();

    public async Task<string> SendCodeAsync(string toAddress, string toName, string purpose, CancellationToken cancellationToken = default)
    {
        var code = verification.RequestCode(toAddress);
        var safeName = string.IsNullOrWhiteSpace(toName) ? "there" : toName;

        var text =
            $"Hello {safeName},\r\n\r\n" +
            $"Your NASPS {purpose} code is: {code}\r\n" +
            "This code expires in 5 minutes.\r\n\r\n" +
            "If you did not request this, you can ignore this email.";

        var html =
            $"<p>Hello {WebUtility.HtmlEncode(safeName)},</p>" +
            $"<p>Your NASPS {WebUtility.HtmlEncode(purpose)} code is:</p>" +
            $"<p style=\"font-size:28px;font-weight:700;letter-spacing:4px;margin:16px 0\">{code}</p>" +
            "<p>This code expires in 5 minutes.</p>" +
            "<p style=\"color:#667085;font-size:12px\">If you did not request this, you can ignore this email.</p>";

        try
        {
            await email.SendAsync(new EmailMessage(toAddress, safeName, "Your NASPS verification code", html, text), cancellationToken);
            logger.LogInformation("Sent {Purpose} OTP to {Recipient}", purpose, toAddress);
        }
        catch (Exception ex)
        {
            // The code is already stored; surface the failure but don't block the request.
            logger.LogError(ex, "Failed to send {Purpose} OTP to {Recipient}", purpose, toAddress);
        }
        return code;
    }

    public VerificationResult Verify(string toAddress, string code) => verification.VerifyCode(toAddress, code);
}
