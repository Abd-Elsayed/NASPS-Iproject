using System.Security.Claims;
using Nasps.Api.Models;

namespace Nasps.Api.Controllers;

/// <summary>Reads the identity claims that the JWT carries about the caller.</summary>
public readonly record struct CallerContext(int UserId, string Role, string Department, bool IsSuperAdmin)
{
    public bool IsTrainee => Role == "trainee";
    public bool IsDepartmentAdmin => Role == "admin" && !IsSuperAdmin;

    public static CallerContext From(ClaimsPrincipal principal) => new(
        UserId: int.TryParse(principal.FindFirst("sub")?.Value, out var userId) ? userId : -1,
        Role: principal.FindFirst("role")?.Value ?? string.Empty,
        Department: principal.FindFirst("department")?.Value ?? string.Empty,
        IsSuperAdmin: principal.FindFirst("isSuperAdmin")?.Value == "true");
}
