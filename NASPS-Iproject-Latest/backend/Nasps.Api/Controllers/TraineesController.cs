using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Models.Dtos;
using Nasps.Api.Services;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/trainees")]
[Authorize(Roles = "admin")]
public class TraineesController(NaspsDbContext db, AuthService auth, EmailOtpService otp, NotificationService notifications) : ControllerBase
{
    private CallerContext Caller => CallerContext.From(User);

    /// <summary>Trainees the caller is allowed to see: everyone for a super admin,
    /// only the caller's own department for a department admin.</summary>
    private IQueryable<User> ScopedTrainees()
    {
        var query = db.Users.Where(u => u.Role == UserRole.Trainee);
        if (Caller.IsDepartmentAdmin)
            query = query.Where(u => u.Department == Caller.Department);
        return query;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TraineeDto>>> GetAll()
    {
        var trainees = await ScopedTrainees().AsNoTracking().OrderBy(u => u.Id).ToListAsync();
        return Ok(trainees.Select(TraineeDto.From));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TraineeDto>> GetById(int id)
    {
        var trainee = await ScopedTrainees().AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
        return trainee is null ? NotFound() : Ok(TraineeDto.From(trainee));
    }

    [HttpPost]
    public async Task<ActionResult<TraineeAccessResponse>> Create(CreateTraineeRequest request)
    {
        // A department admin can only add trainees into their own department.
        var department = Caller.IsDepartmentAdmin ? Caller.Department : request.Department;
        if (Caller.IsDepartmentAdmin &&
            !string.Equals(request.Department, Caller.Department, StringComparison.OrdinalIgnoreCase))
        {
            return Forbid();
        }

        var trainee = new User
        {
            Name = request.Name,
            Email = request.Email,
            Role = UserRole.Trainee,
            InternshipProgram = request.InternshipProgram,
            Phone = request.Phone,
            Department = department,
            University = request.University,
            JoinDate = DateOnly.FromDateTime(DateTime.UtcNow),
            Status = TraineeStatus.Active,
            MustChangePassword = true,
        };
        db.Users.Add(trainee);
        await db.SaveChangesAsync();

        var access = await auth.RegisterTraineeAsync(trainee.Id);
        // New trainees verify their email with an OTP before their first sign-in.
        await otp.SendCodeAsync(trainee.Email, trainee.Name, "account verification");
        await notifications.TraineeAddedAsync(trainee);
        return CreatedAtAction(nameof(GetById), new { id = trainee.Id }, access);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateTraineeRequest update)
    {
        var trainee = await ScopedTrainees().FirstOrDefaultAsync(u => u.Id == id);
        if (trainee is null) return NotFound();

        // A department admin cannot move a trainee out of their department.
        if (Caller.IsDepartmentAdmin &&
            !string.Equals(update.Department, Caller.Department, StringComparison.OrdinalIgnoreCase))
        {
            return Forbid();
        }

        trainee.Name = update.Name;
        trainee.Email = update.Email;
        trainee.InternshipProgram = update.InternshipProgram;
        trainee.Phone = update.Phone;
        trainee.Department = update.Department;
        trainee.University = update.University;
        trainee.Status = update.Status;
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var trainee = await ScopedTrainees().FirstOrDefaultAsync(u => u.Id == id);
        if (trainee is null) return NotFound();

        db.Users.Remove(trainee);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
