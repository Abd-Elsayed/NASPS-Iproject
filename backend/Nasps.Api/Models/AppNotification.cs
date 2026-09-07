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

    public int? TraineeId { get; set; }
    public Trainee? Trainee { get; set; }
}
