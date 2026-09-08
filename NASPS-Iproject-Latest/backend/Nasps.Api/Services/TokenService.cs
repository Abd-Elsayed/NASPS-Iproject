using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Nasps.Api.Models;

namespace Nasps.Api.Services;

public class TokenService(IConfiguration configuration)
{
    public string CreateToken(User user)
    {
        var issuer = configuration["Jwt:Issuer"] ?? "Nasps.Api";
        var audience = configuration["Jwt:Audience"] ?? "Nasps.Angular";
        var key = configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");

        // The Angular guards/routes only understand "admin" and "trainee"; both admin
        // tiers map to "admin". The finer distinction travels in the extra claims below.
        var coarseRole = user.Role == UserRole.Trainee ? "trainee" : "admin";

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new("name", user.Name),
            new("role", coarseRole),
            new("roleName", user.Role.ToString()),
            new("department", user.Department),
            new("isSuperAdmin", (user.Role == UserRole.SuperAdmin).ToString().ToLowerInvariant()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        };
        if (user.Role == UserRole.Trainee)
            claims.Add(new Claim("traineeId", user.Id.ToString()));

        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            SecurityAlgorithms.HmacSha256
        );
        var token = new JwtSecurityToken(
            issuer,
            audience,
            claims,
            expires: DateTime.UtcNow.AddHours(8),
            signingCredentials: credentials
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
