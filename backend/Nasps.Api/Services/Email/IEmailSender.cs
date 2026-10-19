namespace Nasps.Api.Services.Email;

public record EmailInlineImage(string ContentId, string FileName, string ContentType, byte[] Content);

public record EmailMessage(
    string ToAddress,
    string ToName,
    string Subject,
    string HtmlBody,
    string TextBody,
    IReadOnlyList<EmailInlineImage>? InlineImages = null);

public interface IEmailSender
{
    Task SendAsync(EmailMessage message, CancellationToken cancellationToken = default);
}
