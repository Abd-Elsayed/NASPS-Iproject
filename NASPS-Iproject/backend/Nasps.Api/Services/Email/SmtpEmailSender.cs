using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Nasps.Api.Services.Email;

/// <summary>Sends real mail through an SMTP server (MailKit). Used when Email:Host is set.</summary>
public class SmtpEmailSender(IOptions<EmailOptions> options, ILogger<SmtpEmailSender> logger) : IEmailSender
{
    private readonly EmailOptions _options = options.Value;

    public async Task SendAsync(EmailMessage message, CancellationToken cancellationToken = default)
    {
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

        using var client = new SmtpClient();
        client.Timeout = Math.Clamp(_options.TimeoutMilliseconds, 5_000, 120_000);
        var socketOptions = _options.UseSslOnConnect
            ? SecureSocketOptions.SslOnConnect
            : _options.UseStartTls
                ? SecureSocketOptions.StartTls
                : SecureSocketOptions.Auto;
        await client.ConnectAsync(_options.Host, _options.Port, socketOptions, cancellationToken);
        if (!string.IsNullOrWhiteSpace(_options.User))
            await client.AuthenticateAsync(_options.User, _options.Password, cancellationToken);
        await client.SendAsync(mime, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);

        logger.LogInformation("Sent email to {Recipient} via SMTP {Host}", message.ToAddress, _options.Host);
    }
}
