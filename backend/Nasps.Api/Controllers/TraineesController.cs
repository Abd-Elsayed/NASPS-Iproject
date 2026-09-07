using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Models.Dtos;
using Nasps.Api.Services;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/trainees")]
public class TraineesController(NaspsDbContext db, AuthService auth) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Trainee>>> GetAll() =>
        Ok(await db.Trainees.AsNoTracking().ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Trainee>> GetById(int id)
    {
        var trainee = await db.Trainees.FindAsync(id);
        return trainee is null ? NotFound() : Ok(trainee);
    }

    [HttpPost]
    public async Task<ActionResult<TraineeAccessResponse>> Create(CreateTraineeRequest request)
    {
        var trainee = new Trainee
        {
            Name = request.Name,
            Email = request.Email,
            InternshipProgram = request.InternshipProgram,
            Phone = request.Phone,
            Department = request.Department,
            University = request.University,
            JoinDate = DateOnly.FromDateTime(DateTime.UtcNow),
            Status = TraineeStatus.Active,
        };
        db.Trainees.Add(trainee);
        await db.SaveChangesAsync();

        var access = await auth.RegisterTraineeAsync(trainee.Id);
        return CreatedAtAction(nameof(GetById), new { id = trainee.Id }, access);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Trainee update)
    {
        var trainee = await db.Trainees.FindAsync(id);
        if (trainee is null) return NotFound();

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
        var trainee = await db.Trainees.FindAsync(id);
        if (trainee is null) return NotFound();

        db.Trainees.Remove(trainee);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
