using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;

namespace Nasps.Api.Services;

/// <summary>Creates the in-app notifications that the trainee/admin inboxes read.</summary>
public class NotificationService(NaspsDbContext db)
{
    public async Task TaskAssignedAsync(TrainingTask task)
    {
        Add(NotificationCategory.Tasks, task.TraineeId,
            $"New task “{task.Title}” was assigned to you.", task.Id);
        await db.SaveChangesAsync();
    }

    public async Task TaskSubmittedAsync(TrainingTask task, User trainee)
    {
        var adminIds = await AdminIdsForDepartmentAsync(trainee.Department);
        foreach (var adminId in adminIds)
            Add(NotificationCategory.Tasks, adminId,
                $"{trainee.Name} submitted “{task.Title}” for review.", task.Id);
        await db.SaveChangesAsync();
    }

    public async Task TaskReviewedAsync(TrainingTask task, bool approved)
    {
        var verb = approved ? "approved" : "returned for changes";
        Add(NotificationCategory.Tasks, task.TraineeId,
            $"Your task “{task.Title}” was {verb}.", task.Id);
        await db.SaveChangesAsync();
    }

    public async Task TraineeAddedAsync(User trainee)
    {
        var adminIds = await AdminIdsForDepartmentAsync(trainee.Department);
        foreach (var adminId in adminIds)
            Add(NotificationCategory.System, adminId,
                $"New trainee {trainee.Name} was added to {trainee.Department}.");
        await db.SaveChangesAsync();
    }

    private void Add(NotificationCategory category, int? recipientId, string message, int? taskId = null) =>
        db.Notifications.Add(new AppNotification
        {
            Category = category,
            RecipientId = recipientId,
            Message = message,
            TaskId = taskId,
            Time = DateTime.UtcNow,
        });

    private Task<List<int>> AdminIdsForDepartmentAsync(string department) =>
        db.Users
            .Where(u => u.Role == UserRole.SuperAdmin ||
                        (u.Role == UserRole.Admin && u.Department == department))
            .Select(u => u.Id)
            .ToListAsync();
}
