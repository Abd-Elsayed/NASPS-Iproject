using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Services;

public sealed class TraineeAiContextFactory(NaspsDbContext db) : ITraineeAiContextFactory
{
    public async Task<TraineeAiContextDto?> CreateAsync(int traineeId, IReadOnlyList<AiTaskContextDto>? currentTasks, CancellationToken cancellationToken)
    {
        var trainee = await db.Users.AsNoTracking().SingleOrDefaultAsync(item => item.Id == traineeId && item.Role == UserRole.Trainee, cancellationToken);
        if (trainee is null) return null;
        var storedTasks = await db.Tasks.AsNoTracking().Where(item => item.TraineeId == traineeId).OrderByDescending(item => item.DueDate).Take(25).ToListAsync(cancellationToken);
        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        var tasks = currentTasks is { Count: > 0 }
            ? currentTasks.Take(25).Select(Sanitize).ToList()
            : storedTasks.Select(item => new AiTaskContextDto(Limit(item.Title, 120), Limit(item.Description, 500), item.Priority.ToString(), item.Status.ToString(), item.DueDate.ToString("yyyy-MM-dd"), string.IsNullOrWhiteSpace(item.AdminReview) ? null : Limit(item.AdminReview, 300))).ToList();

        return new TraineeAiContextDto(trainee.Id, trainee.InternshipProgram, trainee.Department, trainee.University, tasks.Count,
            tasks.Count(item => Normalize(item.Status) == "completed"), tasks.Count(item => Normalize(item.Status) == "inprogress"),
            tasks.Count(item => Normalize(item.Status) == "pending"), tasks.Count(item => Normalize(item.Status) == "needschanges"),
            tasks.Count(item => Normalize(item.Status) != "completed" && DateOnly.TryParse(item.DueDate, out var due) && due < today), tasks);
    }

    private static string Limit(string value, int length) => value.Length <= length ? value : value[..length];
    private static AiTaskContextDto Sanitize(AiTaskContextDto item) => new(Limit(item.Title?.Trim() ?? string.Empty, 120), Limit(item.Description?.Trim() ?? string.Empty, 500), Limit(item.Priority?.Trim() ?? "Medium", 20), Limit(item.Status?.Trim() ?? "Pending", 30), Limit(item.DueDate?.Trim() ?? string.Empty, 10), string.IsNullOrWhiteSpace(item.AdminReview) ? null : Limit(item.AdminReview.Trim(), 300));
    private static string Normalize(string value) => value.Replace(" ", string.Empty).ToLowerInvariant();
}
