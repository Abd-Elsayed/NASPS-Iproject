namespace Nasps.Api.Services.Email;

public sealed class EmailDeliveryException(string message, Exception? innerException = null) : Exception(message, innerException);

/// <summary>Prevents an unconfigured API from reporting that a real email was sent.</summary>
public sealed class UnavailableEmailSender : IEmailSender
{
    public Task SendAsync(EmailMessage message, CancellationToken cancellationToken = default) =>
        throw new EmailDeliveryException("Email is not configured. Add the Gmail SMTP settings to backend User Secrets, then try again.");
}
