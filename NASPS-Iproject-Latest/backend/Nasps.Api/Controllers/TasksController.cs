using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Models.Dtos;
using Nasps.Api.Services;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/tasks")]
[Authorize]
public class TasksController(NaspsDbContext db, NotificationService notifications) : ControllerBase
{
    private CallerContext Caller => CallerContext.From(User);

    /// <summary>Tasks the caller may touch: their own (trainee), their department's
    /// (department admin), or all (super admin).</summary>
    private IQueryable<TrainingTask> ScopedTasks()
    {
        var query = db.Tasks.AsQueryable();
        if (Caller.IsDepartmentAdmin)
        {
            var department = Caller.Department;
            query = query.Where(t => db.Users.Any(u => u.Id == t.TraineeId && u.Department == department));
        }
        return query;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll([FromQuery] int? traineeId)
    {
        var query = ScopedTasks().AsNoTracking();
        if (traineeId is not null) query = query.Where(t => t.TraineeId == traineeId);
        var tasks = await query.OrderByDescending(t => t.Id).ToListAsync();
        return Ok(tasks.Select(TaskDto.From));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TaskDto>> GetById(int id)
    {
        var task = await ScopedTasks().AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
        return task is null ? NotFound() : Ok(TaskDto.From(task));
    }

    [HttpPost]
    [Authorize(Roles = "admin")]
    public async Task<ActionResult<TaskDto>> Create(CreateTaskRequest request)
    {
        var trainee = await db.Users.FirstOrDefaultAsync(u => u.Id == request.TraineeId && u.Role == UserRole.Trainee);
        if (trainee is null) return BadRequest(new { message = "The selected trainee does not exist." });
        if (Caller.IsDepartmentAdmin && trainee.Department != Caller.Department)
            return Forbid();

        var task = new TrainingTask
        {
            Title = request.Title,
            Description = request.Description,
            TraineeId = request.TraineeId,
            Priority = request.Priority,
            DueDate = request.DueDate,
            Status = Models.TaskStatus.Pending,
            Instructions = request.Instructions,
            AttachmentName = request.Attachment,
            AttachmentType = request.AttachmentType,
            AttachmentSize = request.AttachmentSize,
        };
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        await notifications.TaskAssignedAsync(task);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, TaskDto.From(task));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TaskDto>> Update(int id, TaskUpdateRequest patch)
    {
        var task = await ScopedTasks().FirstOrDefaultAsync(t => t.Id == id);
        if (task is null) return NotFound();

        // Trainees may only move their own task forward / attach a submission.
        if (Caller.IsTrainee && task.TraineeId.ToString() != (User.FindFirst("traineeId")?.Value ?? "-1"))
            return Forbid();

        if (patch.Title is not null) task.Title = patch.Title;
        if (patch.Description is not null) task.Description = patch.Description;
        if (patch.Priority is not null) task.Priority = patch.Priority.Value;
        if (patch.DueDate is not null) task.DueDate = patch.DueDate.Value;
        if (patch.Status is not null) task.Status = patch.Status.Value;
        if (patch.Instructions is not null) task.Instructions = patch.Instructions;
        if (patch.Attachment is not null) task.AttachmentName = patch.Attachment;
        if (patch.AttachmentType is not null) task.AttachmentType = patch.AttachmentType;
        if (patch.AttachmentSize is not null) task.AttachmentSize = patch.AttachmentSize;
        if (patch.SubmissionName is not null || patch.Submission is not null)
            task.SubmissionName = patch.SubmissionName ?? patch.Submission;
        if (patch.SubmissionType is not null) task.SubmissionType = patch.SubmissionType;
        if (patch.SubmissionSize is not null) task.SubmissionSize = patch.SubmissionSize;
        if (patch.AdminReview is not null) task.AdminReview = patch.AdminReview;

        if (patch.ClearAttachment)
        {
            task.AttachmentName = task.AttachmentType = null;
            task.AttachmentSize = null;
        }
        if (patch.ClearSubmission)
        {
            task.SubmissionName = task.SubmissionType = null;
            task.SubmissionSize = null;
        }

        await db.SaveChangesAsync();

        var submitted = patch.Submission is not null || patch.SubmissionName is not null;
        var reviewed = !Caller.IsTrainee && (patch.AdminReview is not null
            || patch.Status is Models.TaskStatus.Completed or Models.TaskStatus.NeedsChanges);
        if (Caller.IsTrainee && submitted)
        {
            var trainee = await db.Users.FindAsync(task.TraineeId);
            if (trainee is not null) await notifications.TaskSubmittedAsync(task, trainee);
        }
        else if (reviewed)
        {
            await notifications.TaskReviewedAsync(task, approved: patch.Status == Models.TaskStatus.Completed);
        }

        return Ok(TaskDto.From(task));
    }

    [HttpDelete("{id:int}")]
    [Authorize(Roles = "admin")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await ScopedTasks().FirstOrDefaultAsync(t => t.Id == id);
        if (task is null) return NotFound();

        db.Tasks.Remove(task);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
