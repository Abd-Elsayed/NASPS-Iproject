using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;
using System.Text;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Services;
using Nasps.Api.Services.Email;

// The empty builder avoids platform-specific host discovery while keeping the same
// ASP.NET Core pipeline. Register the normal configuration sources explicitly.
var environmentName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")
    ?? Environments.Production;
var builder = WebApplication.CreateEmptyBuilder(new WebApplicationOptions
{
    Args = args,
    ApplicationName = System.Reflection.Assembly.GetExecutingAssembly().GetName().Name,
    ContentRootPath = Directory.GetCurrentDirectory(),
    EnvironmentName = environmentName,
});
builder.WebHost.UseKestrel();
builder.Configuration
    .SetBasePath(builder.Environment.ContentRootPath)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: false)
    .AddEnvironmentVariables()
    .AddCommandLine(args);
if (builder.Environment.IsDevelopment())
    builder.Configuration.AddUserSecrets(System.Reflection.Assembly.GetExecutingAssembly(), optional: true);
builder.WebHost.UseSetting(WebHostDefaults.ServerUrlsKey,
    builder.Configuration[WebHostDefaults.ServerUrlsKey] ?? "http://127.0.0.1:5222");
builder.Logging.AddConsole();

const string AngularDevClient = "AngularDevClient";

builder.Services.AddControllers().AddJsonOptions(options =>
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddOpenApi();

var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key is not configured.");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Keep claim names exactly as issued ("role", "department", …) instead of
        // remapping them to the long WS-* URIs.
        options.MapInboundClaims = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "Nasps.Api",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "Nasps.Angular",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            RoleClaimType = "role",
        };
    });
builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("Default")
    ?? throw new InvalidOperationException("ConnectionStrings:Default is not configured.");
builder.Services.AddDbContext<NaspsDbContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddSingleton<IPasswordHasher<User>, PasswordHasher<User>>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<VerificationService>();

// Email + OTP. Real SMTP is the default production path. The file sender is available
// only when a developer explicitly enables it in local configuration.
builder.Services.Configure<EmailOptions>(builder.Configuration.GetSection(EmailOptions.SectionName));
var emailOptions = builder.Configuration.GetSection(EmailOptions.SectionName).Get<EmailOptions>() ?? new EmailOptions();
if (emailOptions.HasSmtp)
    builder.Services.AddSingleton<IEmailSender, SmtpEmailSender>();
else if (emailOptions.UseDevelopmentSender)
    builder.Services.AddSingleton<IEmailSender, DevEmailSender>();
else
    builder.Services.AddSingleton<IEmailSender, UnavailableEmailSender>();
builder.Services.AddSingleton<EmailOtpService>();
Console.WriteLine(emailOptions.HasSmtp
    ? $"[Email] SMTP sender active: {emailOptions.Host}:{emailOptions.Port} as {emailOptions.User}"
    : emailOptions.UseDevelopmentSender
        ? "[Email] Explicit development sender active - messages are written to sent-emails/"
        : "[Email] SMTP is not configured - verification endpoints will return a clear error instead of fake success");
Console.WriteLine("[Database] SqlServer provider active");
builder.Services.AddScoped<NotificationService>();
builder.Services.Configure<AiProviderOptions>(builder.Configuration.GetSection(AiProviderOptions.SectionName));
builder.Services.AddHttpClient<IAiService, ConfiguredAiService>()
    // Do not forward the Gemini key on redirects; provider calls do not need cookies.
    .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler { AllowAutoRedirect = false, UseCookies = false });
builder.Services.AddScoped<ITraineeAiContextFactory, TraineeAiContextFactory>();

var configuredCorsOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>() ?? [];
var corsOrigins = new[]
{
    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "http://localhost:4201",
    "http://127.0.0.1:4201",
    "http://localhost:4202",
    "http://127.0.0.1:4202",
    "http://localhost:4203",
    "http://127.0.0.1:4203",
    "http://localhost:4204",
    "http://127.0.0.1:4204",
    "http://localhost:4205",
    "http://127.0.0.1:4205",
}.Concat(configuredCorsOrigins).Distinct(StringComparer.OrdinalIgnoreCase).ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy(AngularDevClient, policy =>
        policy.WithOrigins(corsOrigins).AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

app.UseExceptionHandler(exceptionApp => exceptionApp.Run(async context =>
{
    var exception = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>()?.Error;
    context.Response.StatusCode = exception is EmailDeliveryException
        ? StatusCodes.Status503ServiceUnavailable
        : StatusCodes.Status500InternalServerError;
    await context.Response.WriteAsJsonAsync(new
    {
        success = false,
        message = exception is EmailDeliveryException
            ? exception.Message
            : "The server could not complete the request."
    });
}));

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<NaspsDbContext>();
    db.Database.Migrate();

    // Keep the original sample-data initializer available for isolated development,
    // but never create sample accounts in a normal installation.
    if (builder.Configuration.GetValue<bool>("DevelopmentData:Seed") && !db.Users.Any())
    {
        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher<User>>();

        // Trainees are seeded first so their Ids (1..5) match the NASPS-T00x usernames.
        var trainees = new[]
        {
            new User { Name = "Ahmed Ali", Email = "ahmed@example.com", Role = UserRole.Trainee, InternshipProgram = "UI/UX Design", Phone = "+20 101 234 5678", Department = "Design", University = "Cairo University", JoinDate = new DateOnly(2024, 1, 10), MustChangePassword = true },
            new User { Name = "Sara Mohamed", Email = "sara@example.com", Role = UserRole.Trainee, InternshipProgram = "Frontend Web Development", Phone = "+20 102 345 6789", Department = "Engineering", University = "Ain Shams University", JoinDate = new DateOnly(2024, 2, 14), MustChangePassword = true },
            new User { Name = "Mostafa Khaled", Email = "mostafa@example.com", Role = UserRole.Trainee, InternshipProgram = "Data Science & AI", Phone = "+20 103 456 7890", Department = "Data & AI", University = "Mansoura University", JoinDate = new DateOnly(2024, 3, 2), MustChangePassword = true },
            new User { Name = "Nourhan Ahmed", Email = "nourhan@example.com", Role = UserRole.Trainee, InternshipProgram = "Project Management", Phone = "+20 104 567 8901", Department = "Operations", University = "Alexandria University", JoinDate = new DateOnly(2024, 3, 20), Status = TraineeStatus.Inactive, MustChangePassword = true },
            new User { Name = "Omar Hassan", Email = "omar@example.com", Role = UserRole.Trainee, InternshipProgram = "Mobile Application Development", Phone = "+20 105 678 9012", Department = "Engineering", University = "Helwan University", JoinDate = new DateOnly(2024, 4, 5), MustChangePassword = true },
        };
        db.Users.AddRange(trainees);
        db.SaveChanges();

        foreach (var trainee in trainees)
        {
            trainee.Username = AuthService.UsernameFor(trainee.Id);
            trainee.PasswordHash = hasher.HashPassword(trainee, AuthService.TemporaryPasswordFor(trainee.Id));
            trainee.EmailVerified = true; // explicitly enabled development data only
        }

        var admins = new[]
        {
            new User { Name = "System Admin", Email = "admin@nasps.com", Role = UserRole.SuperAdmin, Department = "System Administration" },
            new User { Name = "Engineering Admin", Email = "eng.admin@nasps.com", Role = UserRole.Admin, Department = "Engineering" },
            new User { Name = "Design Admin", Email = "design.admin@nasps.com", Role = UserRole.Admin, Department = "Design" },
        };
        foreach (var admin in admins)
        {
            admin.Username = admin.Email;
            admin.MustChangePassword = false;
            admin.EmailVerified = true; // seeded admins skip the OTP step
            admin.PasswordHash = hasher.HashPassword(admin, "Admin@123");
        }
        db.Users.AddRange(admins);
        db.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors(AngularDevClient);
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
