using Microsoft.EntityFrameworkCore;
using Nasps.Api.Models;

namespace Nasps.Api.Data;

public class NaspsDbContext(DbContextOptions<NaspsDbContext> options) : DbContext(options)
{
    public DbSet<Trainee> Trainees => Set<Trainee>();
    public DbSet<TrainingTask> Tasks => Set<TrainingTask>();
    public DbSet<AppNotification> Notifications => Set<AppNotification>();
    public DbSet<TraineeCredential> Credentials => Set<TraineeCredential>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Trainee>().HasIndex(t => t.Email).IsUnique();

        modelBuilder.Entity<TraineeCredential>()
            .HasKey(c => c.TraineeId);
        modelBuilder.Entity<TraineeCredential>()
            .HasOne(c => c.Trainee)
            .WithOne(t => t.Credential)
            .HasForeignKey<TraineeCredential>(c => c.TraineeId);

        modelBuilder.Entity<TrainingTask>()
            .HasOne(t => t.Trainee)
            .WithMany()
            .HasForeignKey(t => t.TraineeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AppNotification>()
            .HasOne(n => n.Trainee)
            .WithMany()
            .HasForeignKey(n => n.TraineeId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
