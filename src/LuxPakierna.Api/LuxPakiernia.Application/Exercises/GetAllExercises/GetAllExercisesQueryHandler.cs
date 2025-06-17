using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Domain.Repositories;
using MediatR;

namespace LuxPakiernia.Application.Exercises.GetAllExercises;
public class GetAllExercisesQueryHandler : IRequestHandler<GetAllExercisesQuery, IEnumerable<ExerciseDto>>
{
    private readonly IExerciseRepository _repo;

    public GetAllExercisesQueryHandler(IExerciseRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ExerciseDto>> Handle(GetAllExercisesQuery request, CancellationToken cancellationToken)
    {
        var exercises = await _repo.GetAllAsync();
        if (!string.IsNullOrEmpty(request.MuscleGroup))
        {
            exercises = exercises.Where(e =>
                e.MuscleGroup.Equals(request.MuscleGroup, StringComparison.OrdinalIgnoreCase));
        }

        // Sortowanie
        if (!string.IsNullOrEmpty(request.SortByName))
        {
            exercises = request.SortByName.ToLower() switch
            {
                "asc" => exercises.OrderBy(e => e.Name),
                "desc" => exercises.OrderByDescending(e => e.Name),
                _ => exercises
            };
        }
        return exercises.Select(e => new ExerciseDto
        {
            Id = e.Id,
            Name = e.Name,
            Description = e.Description,
            MuscleGroup = e.MuscleGroup
        });
    }
}

