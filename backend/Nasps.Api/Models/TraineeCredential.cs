namespace Nasps.Api.Models;

public class TraineeCredential
{
    public int TraineeId { get; set; }
    public Trainee? Trainee { get; set; }
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public bool MustChangePassword { get; set; } = true;
}
