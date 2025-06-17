using LuxPakiernia.Application.Interfaces;
using LuxPakiernia.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuxPakiernia.Infrastructure.Persistance;


public class LuxPakierniaDbContext(DbContextOptions<LuxPakierniaDbContext> options)
          : DbContext(options), ILuxPakierniaDbContext
{
    public DbSet<User> User { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Plan> Plans { get; set; }
    public DbSet<ExerciseInPlan> ExercisesInPlans { get; set; }
    public DbSet<PlanUser> PlanUsers { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Możesz dodać konfiguracje dla swoich encji
        // builder.ApplyConfiguration(new UserConfiguration());
    }
}
