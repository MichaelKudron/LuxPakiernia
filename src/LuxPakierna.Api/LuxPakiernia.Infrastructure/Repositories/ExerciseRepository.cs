using LuxPakiernia.Domain.Entities;
using LuxPakiernia.Domain.Repositories;
using LuxPakiernia.Infrastructure.Persistance;
using Microsoft.EntityFrameworkCore;

namespace LuxPakiernia.Infrastructure.Repositories;
public class ExerciseRepository : IExerciseRepository
{
    private readonly LuxPakierniaDbContext _dbContext;

    public ExerciseRepository(LuxPakierniaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Exercise?> GetByIdAsync(Guid? id)
        => await _dbContext.Exercises.FirstOrDefaultAsync(e => e.Id == id);

    public async Task<IEnumerable<Exercise>> GetAllAsync()
        => await _dbContext.Exercises.ToListAsync();

    public async Task CreateAsync(Exercise exercise)
    {
        _dbContext.Exercises.Add(exercise);
        await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(Exercise exercise)
    {
        _dbContext.Exercises.Update(exercise);
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(Exercise exercise)
    {
        _dbContext.Exercises.Remove(exercise);
        await _dbContext.SaveChangesAsync();
    }

    public Task SaveChangesAsync()
        => _dbContext.SaveChangesAsync();
}

