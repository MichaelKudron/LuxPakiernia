using LuxPakiernia.Infrastructure.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LuxPakiernia.Infrastructure.Persistance;


public class LuxPakierniaDbContext(DbContextOptions<LuxPakierniaDbContext> options)
          : DbContext(options)
{
    public DbSet<User> User { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        // Możesz dodać konfiguracje dla swoich encji
        // builder.ApplyConfiguration(new UserConfiguration());
    }
}
