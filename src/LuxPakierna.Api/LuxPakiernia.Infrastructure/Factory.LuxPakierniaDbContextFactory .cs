using LuxPakiernia.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace LuxPakiernia.Infrastructure;
public class LuxPakierniaDbContextFactory : IDesignTimeDbContextFactory<LuxPakierniaDbContext>
{
    public LuxPakierniaDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<LuxPakierniaDbContext>();


        optionsBuilder.UseSqlite("Data Source=LuxPakiernia.db");

        return new LuxPakierniaDbContext(optionsBuilder.Options);
    }
}