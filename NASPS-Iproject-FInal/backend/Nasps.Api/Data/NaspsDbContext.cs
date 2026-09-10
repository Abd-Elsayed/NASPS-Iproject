using Microsoft.EntityFrameworkCore;
using Nasps.Api.Models;

namespace Nasps.Api.Data;

public class NaspsDbContext(DbContextOptions<NaspsDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<TrainingTask> Tasks => Set<TrainingTask>();
    public DbSet<AppNotification> Notifications => Set<AppNotification>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Email).IsUnique();
            entity.HasIndex(u => u.Role);
            // Store the role and status as readable text so the single Users table
            // is self-explanatory when queried directly.
            entity.Property(u => u.Role).HasConversion<string>().HasMaxLength(20);
            entity.Property(u => u.Status).HasConversion<string>().HasMaxLength(20);
        });

        modelBuilder.Entity<TrainingTask>()
            .HasOne(t => t.Trainee)
            .WithMany()
            .HasForeignKey(t => t.TraineeId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<AppNotification>(entity =>
        {
            entity.HasOne(n => n.Recipient)
                .WithMany()
                .HasForeignKey(n => n.RecipientId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasIndex(n => n.RecipientId);
        });
    }
}
