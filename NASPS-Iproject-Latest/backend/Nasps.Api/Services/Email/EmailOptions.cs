namespace Nasps.Api.Services.Email;

/// <summary>Bound from the "Email" section of appsettings.json.</summary>
public class EmailOptions
{
    public const string SectionName = "Email";

    /// <summary>SMTP server host. When empty the app uses the dev sender (logs + .eml files).</summary>
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; } = 587;
    public bool UseStartTls { get; set; } = true;
    public string User { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FromAddress { get; set; } = "no-reply@nasps.com";
    public string FromName { get; set; } = "NASPS Intern Software";

    /// <summary>Folder (relative to content root) where the dev sender drops .eml files.</summary>
    public string PickupDirectory { get; set; } = "sent-emails";

    public bool HasSmtp => !string.IsNullOrWhiteSpace(Host);
}
