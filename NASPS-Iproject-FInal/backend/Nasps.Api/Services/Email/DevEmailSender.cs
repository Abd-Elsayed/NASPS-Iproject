using Microsoft.Extensions.Options;
using MimeKit;

namespace Nasps.Api.Services.Email;

/// <summary>
/// Fallback used when no SMTP server is configured: writes each message to the API log
/// and saves a .eml file under Email:PickupDirectory so the full flow is testable with
/// zero credentials.
/// </summary>
public class DevEmailSender(
    IOptions<EmailOptions> options,
    IHostEnvironment environment,
    ILogger<DevEmailSender> logger) : IEmailSender
{
    private readonly EmailOptions _options = options.Value;

    public async Task SendAsync(EmailMessage message, CancellationToken cancellationToken = default)
    {
        var folder = Path.IsPathRooted(_options.PickupDirectory)
            ? _options.PickupDirectory
            : Path.Combine(environment.ContentRootPath, _options.PickupDirectory);
        Directory.CreateDirectory(folder);

        var mime = new MimeMessage();
        mime.From.Add(new MailboxAddress(_options.FromName, _options.FromAddress));
        mime.To.Add(new MailboxAddress(message.ToName, message.ToAddress));
        mime.Subject = message.Subject;
        var body = new BodyBuilder { HtmlBody = message.HtmlBody, TextBody = message.TextBody };
        foreach (var image in message.InlineImages ?? [])
        {
            var resource = body.LinkedResources.Add(image.FileName, image.Content);
            resource.ContentId = image.ContentId;
        }
        mime.Body = body.ToMessageBody();

        var fileName = $"{DateTime.UtcNow:yyyyMMdd-HHmmss}-{Guid.NewGuid():N}.eml";
        var path = Path.Combine(folder, fileName);
        await using (var stream = File.Create(path))
        {
            await mime.WriteToAsync(stream, cancellationToken);
        }

        logger.LogInformation(
            "[DEV EMAIL] To: {Recipient} | Subject: {Subject}\n{Body}\nSaved: {Path}",
            message.ToAddress, message.Subject, message.TextBody, path);
    }
}
