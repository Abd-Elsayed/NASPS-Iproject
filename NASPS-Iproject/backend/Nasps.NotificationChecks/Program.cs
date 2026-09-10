using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Options;
using Nasps.Api.Data;
using Nasps.Api.Models;
using Nasps.Api.Services;
using Nasps.Api.Services.Email;

var passed = 0;
var failed = 0;

await Check("Task assignment notifies and emails the trainee", async () =>
{
    await using var fixture = await Fixture.CreateAsync();
    var task = fixture.Task;
    await fixture.Service.TaskAssignedAsync(task);
    Assert(await fixture.Db.Notifications.CountAsync() == 1, "in-app notification missing");
    Assert(fixture.Email.Messages.Single().ToAddress == fixture.Trainee.Email, "wrong email recipient");
    Assert(fixture.Email.Messages[0].Subject.Contains(task.Title), "task title missing from subject");
});

await Check("Submission emails matching admins and the super admin only", async () =>
{
    await using var fixture = await Fixture.CreateAsync();
    await fixture.Service.TaskSubmittedAsync(fixture.Task, fixture.Trainee);
    var addresses = fixture.Email.Messages.Select(message => message.ToAddress).Order().ToArray();
    Assert(addresses.SequenceEqual(new[] { "engineering.admin@nasps.test", "super.admin@nasps.test" }), "wrong admin recipients");
    Assert(await fixture.Db.Notifications.CountAsync() == 2, "admin notifications missing");
});

await Check("Review email includes the admin note", async () =>
{
    await using var fixture = await Fixture.CreateAsync();
    fixture.Task.AdminReview = "Please add unit tests.";
    await fixture.Service.TaskReviewedAsync(fixture.Task, approved: false);
    var email = fixture.Email.Messages.Single();
    Assert(email.ToAddress == fixture.Trainee.Email, "wrong trainee recipient");
    Assert(email.TextBody.Contains("Please add unit tests."), "admin note missing");
});

await Check("Adding a trainee emails matching admins", async () =>
{
    await using var fixture = await Fixture.CreateAsync();
    await fixture.Service.TraineeAddedAsync(fixture.Trainee);
    Assert(fixture.Email.Messages.Count == 2, "admin emails missing");
    Assert(await fixture.Db.Notifications.CountAsync() == 2, "admin notifications missing");
});

await Check("SMTP failure never removes the in-app notification", async () =>
{
    await using var fixture = await Fixture.CreateAsync(failEmail: true);
    await fixture.Service.TaskAssignedAsync(fixture.Task);
    Assert(await fixture.Db.Notifications.CountAsync() == 1, "notification was lost after email failure");
});

await Check("Password reset uses the branded verification email", async () =>
{
    var email = new CapturingEmailSender(false);
    var otp = new EmailOtpService(
        new VerificationService(), email, Options.Create(new EmailOptions()), NullLogger<EmailOtpService>.Instance);
    await otp.SendCodeAsync("recipient@example.test", "Sohob", "password reset");
    var message = email.Messages.Single();
    Assert(message.Subject == "Reset your NASPS password", "wrong password-reset subject");
    Assert(message.HtmlBody.Contains("Reset your password") && message.HtmlBody.Contains("#206090"), "branded email missing");
    Assert(message.HtmlBody.Contains("cid:nasps-logo") && message.InlineImages?.Single().Content.Length > 0, "inline NASPS logo missing");
    Assert(message.HtmlBody.Contains("Reset Password in NASPS") && message.HtmlBody.Contains("http://localhost:4200/forgot-password?email=recipient%40example.test"), "password-reset button missing");
    Assert(System.Text.RegularExpressions.Regex.IsMatch(message.TextBody, @"\b\d{6}\b"), "six-digit code missing");
});

await Check("Account verification email opens the Verify Email page", async () =>
{
    var email = new CapturingEmailSender(false);
    var otp = new EmailOtpService(
        new VerificationService(), email, Options.Create(new EmailOptions()), NullLogger<EmailOtpService>.Instance);
    await otp.SendCodeAsync("trainee@example.com", "Trainee", "account verification");
    var message = email.Messages.Single();
    Assert(message.HtmlBody.Contains("Verify Email in NASPS"), "verification button label missing");
    Assert(message.HtmlBody.Contains("http://localhost:4200/verify-email?email=trainee%40example.com"), "verification page link missing");
});

await Check("Verified trainee receives a signed Create Password session", async () =>
{
    await using var fixture = await Fixture.CreateAsync();
    fixture.Trainee.EmailVerified = false;
    fixture.Trainee.MustChangePassword = true;
    fixture.Trainee.Status = TraineeStatus.Inactive;
    await fixture.Db.SaveChangesAsync();
    var configuration = new ConfigurationBuilder().AddInMemoryCollection(new Dictionary<string, string?>
    {
        ["Jwt:Issuer"] = "Nasps.Api",
        ["Jwt:Audience"] = "Nasps.Angular",
        ["Jwt:Key"] = "NASPS-TEST-KEY-ONLY-AT-LEAST-32-CHARACTERS",
    }).Build();
    var auth = new AuthService(fixture.Db, new PasswordHasher<User>(), new TokenService(configuration));
    var result = await auth.CompleteEmailVerificationAsync(fixture.Trainee.Email);
    Assert(result is { Success: true, RequiresPasswordChange: true }, "Create Password redirect flag missing");
    Assert(!string.IsNullOrWhiteSpace(result?.Token), "signed session token missing");
    Assert(fixture.Trainee.EmailVerified && fixture.Trainee.Status == TraineeStatus.Active, "trainee was not activated");
});

Console.WriteLine($"{passed} notification checks passed; {failed} failed.");
return failed == 0 ? 0 : 1;

async Task Check(string name, Func<Task> action)
{
    try { await action(); passed++; Console.WriteLine($"PASS {name}"); }
    catch (Exception exception) { failed++; Console.WriteLine($"FAIL {name}: {exception.Message}"); }
}

static void Assert(bool condition, string message)
{
    if (!condition) throw new InvalidOperationException(message);
}

sealed class Fixture : IAsyncDisposable
{
    private Fixture(SqliteConnection connection, NaspsDbContext db, CapturingEmailSender email,
        NotificationService service, User trainee, TrainingTask task)
    {
        Connection = connection; Db = db; Email = email; Service = service; Trainee = trainee; Task = task;
    }

    private SqliteConnection Connection { get; }
    public NaspsDbContext Db { get; }
    public CapturingEmailSender Email { get; }
    public NotificationService Service { get; }
    public User Trainee { get; }
    public TrainingTask Task { get; }

    public static async Task<Fixture> CreateAsync(bool failEmail = false)
    {
        var connection = new SqliteConnection("Data Source=:memory:");
        await connection.OpenAsync();
        var db = new NaspsDbContext(new DbContextOptionsBuilder<NaspsDbContext>().UseSqlite(connection).Options);
        await db.Database.EnsureCreatedAsync();
        var trainee = new User { Name = "Sara", Email = "sara@example.test", Username = "NASPS-T001", Role = UserRole.Trainee, Department = "Engineering", EmailVerified = true };
        db.Users.AddRange(
            trainee,
            new User { Name = "Engineering Admin", Email = "engineering.admin@nasps.test", Username = "engineering.admin@nasps.test", Role = UserRole.Admin, Department = "Engineering", EmailVerified = true },
            new User { Name = "Design Admin", Email = "design.admin@nasps.test", Username = "design.admin@nasps.test", Role = UserRole.Admin, Department = "Design", EmailVerified = true },
            new User { Name = "Super Admin", Email = "super.admin@nasps.test", Username = "super.admin@nasps.test", Role = UserRole.SuperAdmin, EmailVerified = true });
        await db.SaveChangesAsync();
        var task = new TrainingTask { Title = "Angular Forms", Description = "Build a form", TraineeId = trainee.Id, DueDate = new DateOnly(2026, 9, 15) };
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
        var email = new CapturingEmailSender(failEmail);
        var service = new NotificationService(db, email, NullLogger<NotificationService>.Instance);
        return new Fixture(connection, db, email, service, trainee, task);
    }

    public async ValueTask DisposeAsync()
    {
        await Db.DisposeAsync();
        await Connection.DisposeAsync();
    }
}

sealed class CapturingEmailSender(bool fail) : IEmailSender
{
    public List<EmailMessage> Messages { get; } = [];
    public Task SendAsync(EmailMessage message, CancellationToken cancellationToken = default)
    {
        if (fail) throw new EmailDeliveryException("SMTP unavailable for test");
        Messages.Add(message);
        return Task.CompletedTask;
    }
}
