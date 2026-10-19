namespace Nasps.Api.Models;

public enum NotificationCategory
{
    Tasks,
    System,
}

public class AppNotification
{
    public int Id { get; set; }
    public NotificationCategory Category { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime Time { get; set; } = DateTime.UtcNow;
    public bool Read { get; set; }

    /// <summary>Who should see this notification. Null = everyone (broadcast).</summary>
    public int? RecipientId { get; set; }
    public User? Recipient { get; set; }

    /// <summary>The task this notification is about, when applicable.</summary>
    public int? TaskId { get; set; }
}
