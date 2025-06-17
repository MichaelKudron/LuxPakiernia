using LuxPakiernia.Domain.Entities;

namespace LuxPakiernia.Domain.Repositories;
public interface IExerciseInPlanRepository
{
    Task<IEnumerable<ExerciseInPlan>> GetAllWithExerciseAsync();
    Task<ExerciseInPlan?> GetByIdWithExerciseAsync(Guid id);
    Task<ExerciseInPlan?> GetByIdAsync(Guid id);
    Task CreateAsync(ExerciseInPlan entity);
    Task DeleteAsync(ExerciseInPlan entity);
}

