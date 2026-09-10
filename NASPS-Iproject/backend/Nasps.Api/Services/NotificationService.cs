using System.Net;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Services.Email;

namespace Nasps.Api.Services;

/// <summary>Creates in-app notifications and mirrors each personal notification by email.</summary>
public class NotificationService(
    NaspsDbContext db,
    IEmailSender emailSender,
    ILogger<NotificationService> logger)
{
    public async Task TaskAssignedAsync(TrainingTask task, CancellationToken cancellationToken = default)
    {
        var recipient = await RecipientByIdAsync(task.TraineeId, cancellationToken);
        var message = $"New task “{task.Title}” was assigned to you. Due date: {task.DueDate:dd MMMM yyyy}.";
        Add(NotificationCategory.Tasks, task.TraineeId, message, task.Id);
        await db.SaveChangesAsync(cancellationToken);
        await SendEmailSafelyAsync(recipient, $"New task assigned: {task.Title}", message, cancellationToken);
    }

    public async Task TaskSubmittedAsync(TrainingTask task, User trainee, CancellationToken cancellationToken = default)
    {
        var recipients = await AdminsForDepartmentAsync(trainee.Department, cancellationToken);
        var message = $"{trainee.Name} submitted “{task.Title}” for review.";
        foreach (var recipient in recipients)
            Add(NotificationCategory.Tasks, recipient.Id, message, task.Id);
        await db.SaveChangesAsync(cancellationToken);
        await SendEmailsSafelyAsync(recipients, $"Task submitted for review: {task.Title}", message, cancellationToken);
    }

    public async Task TaskReviewedAsync(TrainingTask task, bool approved, CancellationToken cancellationToken = default)
    {
        var verb = approved ? "approved" : "returned for changes";
        var note = string.IsNullOrWhiteSpace(task.AdminReview)
            ? string.Empty
            : $" Admin note: {task.AdminReview.Trim()}";
        var recipient = await RecipientByIdAsync(task.TraineeId, cancellationToken);
        var message = $"Your task “{task.Title}” was {verb}.{note}";
        Add(NotificationCategory.Tasks, task.TraineeId, message, task.Id);
        await db.SaveChangesAsync(cancellationToken);
        await SendEmailSafelyAsync(recipient, $"Task {verb}: {task.Title}", message, cancellationToken);
    }

    public async Task TraineeAddedAsync(User trainee, CancellationToken cancellationToken = default)
    {
        var recipients = await AdminsForDepartmentAsync(trainee.Department, cancellationToken);
        var message = $"New trainee {trainee.Name} was added to {trainee.Department}.";
        foreach (var recipient in recipients)
            Add(NotificationCategory.System, recipient.Id, message);
        await db.SaveChangesAsync(cancellationToken);
        await SendEmailsSafelyAsync(recipients, $"New trainee added: {trainee.Name}", message, cancellationToken);
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

    private Task<EmailRecipient?> RecipientByIdAsync(int id, CancellationToken cancellationToken) =>
        db.Users.AsNoTracking()
            .Where(user => user.Id == id)
            .Select(user => new EmailRecipient(user.Id, user.Name, user.Email))
            .FirstOrDefaultAsync(cancellationToken);

    private Task<List<EmailRecipient>> AdminsForDepartmentAsync(string department, CancellationToken cancellationToken) =>
        db.Users
            .Where(u => u.Role == UserRole.SuperAdmin ||
                        (u.Role == UserRole.Admin && u.Department == department))
            .Select(u => new EmailRecipient(u.Id, u.Name, u.Email))
            .ToListAsync(cancellationToken);

    private async Task SendEmailsSafelyAsync(
        IEnumerable<EmailRecipient> recipients,
        string subject,
        string message,
        CancellationToken cancellationToken)
    {
        foreach (var recipient in recipients)
            await SendEmailSafelyAsync(recipient, subject, message, cancellationToken);
    }

    private async Task SendEmailSafelyAsync(
        EmailRecipient? recipient,
        string subject,
        string message,
        CancellationToken cancellationToken)
    {
        if (recipient is null || string.IsNullOrWhiteSpace(recipient.Email))
        {
            logger.LogWarning("Notification email was skipped because recipient information is unavailable");
            return;
        }

        var safeName = WebUtility.HtmlEncode(recipient.Name);
        var safeMessage = WebUtility.HtmlEncode(message);
        var email = new EmailMessage(
            recipient.Email,
            recipient.Name,
            $"[NASPS] {subject}",
            $"<h2>NASPS Internship Management System</h2><p>Hello {safeName},</p><p>{safeMessage}</p><p>Sign in to the NASPS website to view the details.</p>",
            $"Hello {recipient.Name},\n\n{message}\n\nSign in to the NASPS website to view the details.");

        try
        {
            await emailSender.SendAsync(email, cancellationToken);
        }
        catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
        {
            throw;
        }
        catch (Exception exception)
        {
            // The action and in-app notification have already been saved. An SMTP
            // outage must not lose a task assignment, submission, or admin review.
            logger.LogWarning(exception,
                "Could not email notification to user {RecipientId}; the in-app notification remains available",
                recipient.Id);
        }
    }

    private sealed record EmailRecipient(int Id, string Name, string Email);
}
