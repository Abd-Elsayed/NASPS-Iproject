using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Services;

var builder = WebApplication.CreateBuilder(args);

const string AngularDevClient = "AngularDevClient";

builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddDbContext<NaspsDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default") ?? "Data Source=nasps.db"));

builder.Services.AddSingleton<IPasswordHasher<TraineeCredential>, PasswordHasher<TraineeCredential>>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddSingleton<VerificationService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(AngularDevClient, policy =>
        policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<NaspsDbContext>();
    db.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors(AngularDevClient);
app.UseAuthorization();
app.MapControllers();

app.Run();
