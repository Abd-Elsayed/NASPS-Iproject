using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;

namespace Nasps.Api.Controllers;

public record NotificationDto(int Id, string Category, string Message, DateTime Time, bool Read, int? TaskId);

[ApiController]
[Route("api/notifications")]
[Authorize]
public class NotificationsController(NaspsDbContext db) : ControllerBase
{
    private int CurrentUserId =>
        int.TryParse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
            ?? User.FindFirst("sub")?.Value, out var id) ? id : -1;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NotificationDto>>> GetAll()
    {
        var me = CurrentUserId;
        var items = await db.Notifications.AsNoTracking()
            .Where(n => n.RecipientId == me)
            .OrderByDescending(n => n.Time)
            .Take(100)
            .ToListAsync();

        return Ok(items.Select(n => new NotificationDto(
            n.Id, n.Category.ToString(), n.Message,
            DateTime.SpecifyKind(n.Time, DateTimeKind.Utc), n.Read, n.TaskId)));
    }

    [HttpPut("{id:int}/read")]
    public async Task<IActionResult> MarkRead(int id)
    {
        var me = CurrentUserId;
        var notification = await db.Notifications
            .FirstOrDefaultAsync(n => n.Id == id && n.RecipientId == me);
        if (notification is null) return NotFound();

        notification.Read = true;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpPut("read-all")]
    public async Task<IActionResult> MarkAllRead()
    {
        var me = CurrentUserId;
        await db.Notifications
            .Where(n => !n.Read && n.RecipientId == me)
            .ExecuteUpdateAsync(s => s.SetProperty(n => n.Read, true));
        return NoContent();
    }
}
