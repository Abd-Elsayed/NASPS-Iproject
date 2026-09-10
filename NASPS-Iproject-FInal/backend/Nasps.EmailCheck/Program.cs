using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Nasps.Api.Services.Email;

var configuration = new ConfigurationBuilder()
    .AddUserSecrets(typeof(EmailOptions).Assembly, optional: true)
    .AddEnvironmentVariables()
    .Build();
var settings = configuration.GetSection(EmailOptions.SectionName).Get<EmailOptions>() ?? new EmailOptions();

if (!settings.HasSmtp || string.IsNullOrWhiteSpace(settings.FromAddress))
{
    Console.Error.WriteLine("SMTP is not configured in local User Secrets.");
    return 1;
}

Console.WriteLine($"Testing SMTP {settings.Host}:{settings.Port}; implicit SSL: {settings.UseSslOnConnect}; credentials configured: {!string.IsNullOrWhiteSpace(settings.Password)}");
var sender = new SmtpEmailSender(Options.Create(settings), NullLogger<SmtpEmailSender>.Instance);
try
{
    await sender.SendAsync(new EmailMessage(
        settings.FromAddress,
        settings.FromName,
        "[NASPS] Email configuration test",
        "<h2 style=\"color:#206090\">NASPS email is configured</h2><p>The application successfully connected, authenticated, and sent this test message.</p>",
        "NASPS email is configured. The application successfully connected, authenticated, and sent this test message."));
    Console.WriteLine("SMTP connection, authentication and test delivery succeeded.");
    return 0;
}
catch (Exception exception)
{
    Console.Error.WriteLine($"SMTP test failed: {exception.GetType().Name}: {exception.Message}");
    return 1;
}
