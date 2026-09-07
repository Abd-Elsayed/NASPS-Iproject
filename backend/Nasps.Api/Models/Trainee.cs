namespace Nasps.Api.Models;

public enum TraineeStatus
{
    Active,
    Inactive,
}

public class Trainee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string InternshipProgram { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string University { get; set; } = string.Empty;
    public DateOnly JoinDate { get; set; }
    public TraineeStatus Status { get; set; } = TraineeStatus.Active;

    public TraineeCredential? Credential { get; set; }
}
