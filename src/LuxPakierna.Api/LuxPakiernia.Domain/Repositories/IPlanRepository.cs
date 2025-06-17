using LuxPakiernia.Domain.Entities;

namespace LuxPakiernia.Domain.Repositories;
public interface IPlanRepository
{
    Task<Plan?> GetByIdAsync(Guid id);
    Task<Plan?> GetByUserIdAsync(Guid userId);
    Task<IEnumerable<Plan>> GetAllAsync();
    Task CreateAsync(Plan plan);
    Task UpdateAsync(Plan plan);
    Task DeleteAsync(Plan plan);
}
