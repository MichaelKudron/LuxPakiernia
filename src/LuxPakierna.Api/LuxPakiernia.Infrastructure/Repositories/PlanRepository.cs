using LuxPakiernia.Domain.Entities;
using LuxPakiernia.Domain.Repositories;
using LuxPakiernia.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace LuxPakiernia.Infrastructure.Repositories;
public class PlanRepository : IPlanRepository
{
    private readonly LuxPakierniaDbContext _dbContext;

    public PlanRepository(LuxPakierniaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Plan?> GetByIdAsync(Guid id)
        => await _dbContext.Plans.FirstOrDefaultAsync(p => p.Id == id);

    public async Task<Plan?> GetByUserIdAsync(Guid userId)
    {
        return await _dbContext.Plans.FirstOrDefaultAsync(p => p.UserId == userId);
    }


    public async Task<IEnumerable<Plan>> GetAllAsync()
        => await _dbContext.Plans.ToListAsync();

    public async Task CreateAsync(Plan plan)
    {
        _dbContext.Plans.Add(plan);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Plan plan)
    {
        _dbContext.Plans.Update(plan);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Plan plan)
    {
        _dbContext.Plans.Remove(plan);
        await _dbContext.SaveChangesAsync();
    }
}
