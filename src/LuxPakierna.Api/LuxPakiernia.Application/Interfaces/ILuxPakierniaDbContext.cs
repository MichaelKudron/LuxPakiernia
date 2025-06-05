namespace LuxPakiernia.Application.Interfaces;
public interface ILuxPakierniaDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
