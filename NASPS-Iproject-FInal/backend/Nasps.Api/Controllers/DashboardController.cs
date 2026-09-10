using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Models.Dtos;

namespace Nasps.Api.Controllers;

[ApiController]
[Route("api/dashboard")]
[Authorize(Roles = "admin")]
public class DashboardController(NaspsDbContext db) : ControllerBase
{
    private CallerContext Caller => CallerContext.From(User);

    [HttpGet("admin")]
    public async Task<ActionResult<AdminDashboardDto>> GetAdminDashboard()
    {
        var currentYear = DateTime.UtcNow.Year;
        var traineeQuery = db.Users.AsNoTracking().Where(user => user.Role == UserRole.Trainee);
        var taskQuery = db.Tasks.AsNoTracking().AsQueryable();

        if (Caller.IsDepartmentAdmin)
        {
            var department = Caller.Department;
            traineeQuery = traineeQuery.Where(user => user.Department == department);
            taskQuery = taskQuery.Where(task =>
                db.Users.Any(user => user.Id == task.TraineeId && user.Department == department));
        }

        // Select only dashboard fields so stored photos and task files never enter
        // the aggregate query or the response payload.
        var trainees = await traineeQuery
            .Select(user => new
            {
                user.Id,
                user.Department,
                user.University,
                user.InternshipProgram,
                user.JoinDate,
                user.Status,
                user.EmailVerified,
            })
            .ToListAsync();

        var tasks = await taskQuery
            .Select(task => new
            {
                task.Id,
                task.Title,
                task.TraineeId,
                task.DueDate,
                task.Status,
            })
            .ToListAsync();

        var traineeNames = (await traineeQuery
            .Select(user => new { user.Id, user.Name })
            .ToListAsync())
            .ToDictionary(user => user.Id, user => user.Name);
        var currentYearTrainees = trainees.Where(item => item.JoinDate.Year == currentYear).ToList();

        static string CleanLabel(string? value, string fallback) =>
            string.IsNullOrWhiteSpace(value) ? fallback : value.Trim();

        static IReadOnlyList<DashboardBreakdownDto> Breakdown(
            IEnumerable<string> labels,
            string fallback) => labels
            .Select(label => CleanLabel(label, fallback))
            .GroupBy(label => label, StringComparer.OrdinalIgnoreCase)
            .Select(group => new DashboardBreakdownDto(group.First(), group.Count()))
            .OrderByDescending(item => item.Count)
            .ThenBy(item => item.Label)
            .ToList();

        var departmentBreakdown = Breakdown(
            currentYearTrainees.Select(item => item.Department), "Not assigned");
        var universityBreakdown = Breakdown(
            currentYearTrainees.Select(item => item.University), "Not specified");
        var programBreakdown = Breakdown(
            currentYearTrainees.Select(item => item.InternshipProgram), "Not assigned");

        var internshipDepartments = currentYearTrainees
            .Where(item => !string.IsNullOrWhiteSpace(item.InternshipProgram))
            .Select(item => CleanLabel(item.Department, "Not assigned"))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(item => item)
            .ToList();

        var completedTasks = tasks.Count(item => item.Status == Models.TaskStatus.Completed);
        var completionRate = tasks.Count == 0
            ? 0
            : (int)Math.Round(completedTasks * 100d / tasks.Count, MidpointRounding.AwayFromZero);

        var recentTasks = tasks
            .OrderByDescending(item => item.Id)
            .Take(5)
            .Select(item => new DashboardRecentTaskDto(
                item.Id,
                item.Title,
                traineeNames.GetValueOrDefault(item.TraineeId, "Unknown trainee"),
                item.DueDate,
                item.Status))
            .ToList();

        return Ok(new AdminDashboardDto(
            CurrentYear: currentYear,
            ScopeLabel: Caller.IsSuperAdmin ? "All departments" : Caller.Department,
            IsSuperAdmin: Caller.IsSuperAdmin,
            TotalTrainees: trainees.Count,
            CurrentYearTrainees: currentYearTrainees.Count,
            ActiveTrainees: trainees.Count(item => item.Status == TraineeStatus.Active),
            InactiveTrainees: trainees.Count(item => item.Status == TraineeStatus.Inactive),
            VerifiedTrainees: trainees.Count(item => item.EmailVerified),
            TotalTasks: tasks.Count,
            PendingTasks: tasks.Count(item => item.Status == Models.TaskStatus.Pending),
            InProgressTasks: tasks.Count(item => item.Status == Models.TaskStatus.InProgress),
            CompletedTasks: completedTasks,
            NeedsChangesTasks: tasks.Count(item => item.Status == Models.TaskStatus.NeedsChanges),
            CompletionRate: completionRate,
            InternshipDepartments: internshipDepartments,
            TopDepartment: departmentBreakdown.FirstOrDefault()?.Label,
            DepartmentBreakdown: departmentBreakdown,
            UniversityBreakdown: universityBreakdown,
            InternshipProgramBreakdown: programBreakdown,
            RecentTasks: recentTasks));
    }
}
