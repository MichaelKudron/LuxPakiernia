using LuxPakiernia.Domain.Entities;

namespace LuxPakiernia.Domain.Repositories;
public interface IExerciseRepository
{
    Task<Exercise?> GetByIdAsync(Guid? id);
    Task<IEnumerable<Exercise>> GetAllAsync();
    Task CreateAsync(Exercise exercise);
    Task UpdateAsync(Exercise exercise);
    Task DeleteAsync(Exercise exercise);
    Task SaveChangesAsync();
}
