using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksController(NaspsDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TrainingTask>>> GetAll([FromQuery] int? traineeId)
    {
        var query = db.Tasks.AsNoTracking().AsQueryable();
        if (traineeId is not null) query = query.Where(t => t.TraineeId == traineeId);
        return Ok(await query.ToListAsync());
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TrainingTask>> GetById(int id)
    {
        var task = await db.Tasks.FindAsync(id);
        return task is null ? NotFound() : Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TrainingTask>> Create(TrainingTask task)
    {
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    [HttpPut("{id:int}/submit")]
    public async Task<IActionResult> Submit(int id, [FromBody] string submissionName)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task is null) return NotFound();

        task.SubmissionName = submissionName;
        task.Status = Nasps.Api.Models.TaskStatus.Completed;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("{id:int}/review")]
    public async Task<IActionResult> Review(int id, [FromBody] string review)
    {
        var task = await db.Tasks.FindAsync(id);
        if (task is null) return NotFound();

        task.AdminReview = review;
        await db.SaveChangesAsync();
        return NoContent();
    }
}
