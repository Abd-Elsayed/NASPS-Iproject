using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/notifications")]
public class NotificationsController(NaspsDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppNotification>>> GetAll([FromQuery] int? traineeId)
    {
        var query = db.Notifications.AsNoTracking().AsQueryable();
        query = traineeId is null ? query.Where(n => n.TraineeId == null) : query.Where(n => n.TraineeId == traineeId);
        return Ok(await query.OrderByDescending(n => n.Time).ToListAsync());
    }

    [HttpPut("{id:int}/read")]
    public async Task<IActionResult> MarkRead(int id)
    {
        var notification = await db.Notifications.FindAsync(id);
        if (notification is null) return NotFound();

        notification.Read = true;
        await db.SaveChangesAsync();
        return NoContent();
    }
}
