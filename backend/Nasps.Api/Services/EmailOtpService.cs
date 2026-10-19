using System.Net;
using Microsoft.Extensions.Options;
using Nasps.Api.Services.Email;

namespace Nasps.Api.Services;

/// <summary>Generates a one-time code, stores it in <see cref="VerificationService"/>, and emails it.</summary>
public class EmailOtpService(
    VerificationService verification,
    IEmailSender email,
    IOptions<EmailOptions> options,
    ILogger<EmailOtpService> logger)
{
    private const string LogoResourceName = "Nasps.Email.Logo";
    private static readonly Lazy<byte[]?> LogoBytes = new(LoadLogo);

    /// <summary>Codes are hidden unless a test environment explicitly opts in.</summary>
    public bool ExposeCodes => options.Value.ExposeCodes;

    public async Task<string> SendCodeAsync(string toAddress, string toName, string purpose, CancellationToken cancellationToken = default)
    {
        var code = verification.RequestCode(toAddress);
        var safeName = string.IsNullOrWhiteSpace(toName) ? "there" : toName;
        var passwordReset = purpose.Equals("password reset", StringComparison.OrdinalIgnoreCase);
        var heading = passwordReset ? "Reset your password" : "Verify your email";
        var subject = passwordReset ? "Reset your NASPS password" : "Verify your NASPS email";
        var websiteUrl = BuildWebsiteUrl(options.Value.WebsiteUrl, toAddress, passwordReset);
        var actionLabel = passwordReset ? "Reset Password in NASPS" : "Verify Email in NASPS";

        var text =
            $"Hello {safeName},\r\n\r\n" +
            $"Your NASPS {purpose} code is: {code}\r\n" +
            $"This code expires in 5 minutes.\r\nOpen NASPS: {websiteUrl}\r\n\r\n" +
            "If you did not request this, you can ignore this email.";

        var html = $"""
            <!doctype html>
            <html lang="en">
            <body style="margin:0;background:#f2f5f7;font-family:Arial,sans-serif;color:#30363b">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f2f5f7;padding:32px 12px">
                <tr><td align="center">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #dfe6eb">
                    <tr><td style="background:#206090;color:#ffffff;padding:28px 36px;text-align:center;font-size:24px;font-weight:700">{heading}</td></tr>
                    <tr><td style="padding:38px 40px">
                      <img src="cid:nasps-logo" width="360" alt="NASPS Technology and Innovation" style="display:block;width:100%;max-width:360px;height:auto;margin:0 auto 34px">
                      <p style="font-size:18px;font-weight:700;color:#164f7d">Hello {WebUtility.HtmlEncode(safeName)},</p>
                      <p>Use the verification code below to continue with your NASPS account.</p>
                      <div style="margin:28px auto;padding:18px 24px;max-width:280px;text-align:center;background:#eaf3f8;border:1px solid #b9d3e4;border-radius:8px;color:#164f7d;font-size:32px;font-weight:700;letter-spacing:7px">{code}</div>
                      <p>This code expires in <strong>5 minutes</strong>.</p>
                      <p style="text-align:center;margin:30px 0">
                        <a href="{WebUtility.HtmlEncode(websiteUrl)}" style="display:inline-block;background:#206090;color:#ffffff;text-decoration:none;font-weight:700;padding:14px 26px;border-radius:6px">{actionLabel}</a>
                      </p>
                      <p style="margin-top:34px;color:#206090;font-size:22px;font-weight:700;letter-spacing:2px">NASPS</p>
                    </td></tr>
                    <tr><td style="background:#f7f7f7;padding:22px;text-align:center;color:#7b8790;font-size:12px">This is an automated message. If you did not request it, please ignore it.</td></tr>
                  </table>
                </td></tr>
              </table>
            </body>
            </html>
            """;

        try
        {
            var images = LogoBytes.Value is { Length: > 0 } logo
                ? new[] { new EmailInlineImage("nasps-logo", "nasps-logo-horizontal.png", "image/png", logo) }
                : [];
            await email.SendAsync(new EmailMessage(toAddress, safeName, subject, html, text, images), cancellationToken);
            logger.LogInformation("Sent {Purpose} OTP to {Recipient}", purpose, toAddress);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to send {Purpose} OTP to {Recipient}", purpose, toAddress);
            throw ex is EmailDeliveryException
                ? ex
                : new EmailDeliveryException("The verification email could not be sent. Check the NASPS SMTP configuration and try again.", ex);
        }
        return code;
    }

    public VerificationResult Verify(string toAddress, string code) => verification.VerifyCode(toAddress, code);

    private static string BuildWebsiteUrl(string configured, string email, bool passwordReset)
    {
        var baseUri = Uri.TryCreate(configured, UriKind.Absolute, out var configuredUri)
            && (configuredUri.Scheme == Uri.UriSchemeHttp || configuredUri.Scheme == Uri.UriSchemeHttps)
                ? configuredUri
                : new Uri("http://localhost:4200/login");
        var route = passwordReset ? "/forgot-password" : "/verify-email";
        var builder = new UriBuilder(baseUri)
        {
            Path = route,
            Query = $"email={Uri.EscapeDataString(email.Trim().ToLowerInvariant())}",
        };
        return builder.Uri.AbsoluteUri;
    }

    private static byte[]? LoadLogo()
    {
        using var stream = typeof(EmailOtpService).Assembly.GetManifestResourceStream(LogoResourceName);
        if (stream is null) return null;
        using var buffer = new MemoryStream();
        stream.CopyTo(buffer);
        return buffer.ToArray();
    }
}
