using LuxPakiernia.Domain.Entities;
using LuxPakiernia.Domain.Repositories;
using LuxPakiernia.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace LuxPakiernia.Infrastructure.Repositories;
public class ExerciseInPlanRepository : IExerciseInPlanRepository
{
    private readonly LuxPakierniaDbContext _dbContext;

    public ExerciseInPlanRepository(LuxPakierniaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<ExerciseInPlan>> GetAllWithExerciseAsync()
        => await _dbContext.ExercisesInPlans
            .Include(e => e.Exercise)
            .Include(e => e.Plan)
            .ToListAsync();

    public async Task<ExerciseInPlan?> GetByIdWithExerciseAsync(Guid id)
        => await _dbContext.ExercisesInPlans
            .Include(e => e.Exercise)
            .Include(e => e.Plan)
            .FirstOrDefaultAsync(e => e.Id == id);

    public async Task<ExerciseInPlan?> GetByIdAsync(Guid id)
        => await _dbContext.ExercisesInPlans.FirstOrDefaultAsync(x => x.Id == id);

    public async Task CreateAsync(ExerciseInPlan entity)
    {
        _dbContext.ExercisesInPlans.Add(entity);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(ExerciseInPlan entity)
    {
        _dbContext.ExercisesInPlans.Remove(entity);
        await _dbContext.SaveChangesAsync();
    }
}

