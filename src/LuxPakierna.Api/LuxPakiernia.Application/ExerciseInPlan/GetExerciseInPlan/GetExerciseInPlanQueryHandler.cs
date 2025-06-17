using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Domain.Repositories;
using MediatR;

namespace LuxPakiernia.Application.ExerciseInPlan.GetExerciseInPlan;
public class GetExerciseInPlanByIdQueryHandler : IRequestHandler<GetExerciseInPlanByIdQuery, ExerciseInPlanDto?>
{
    private readonly IExerciseInPlanRepository _repo;

    public GetExerciseInPlanByIdQueryHandler(IExerciseInPlanRepository repo)
    {
        _repo = repo;
    }

    public async Task<ExerciseInPlanDto?> Handle(GetExerciseInPlanByIdQuery request, CancellationToken cancellationToken)
    {
        var item = await _repo.GetByIdWithExerciseAsync(request.Id);
        if (item == null) return null;

        return new ExerciseInPlanDto
        {
            Id = item.Id,
            ExerciseId = item.ExerciseId,
            SeriesCount = item.SeriesCount,
            RepetitionsCount = item.RepetitionsCount,
            Weight = item.Weight,
            Day = item.Day,
            Exercise = new ExerciseDto
            {
                Id = item.Exercise.Id,
                Name = item.Exercise.Name,
                Description = item.Exercise.Description,
                MuscleGroup = item.Exercise.MuscleGroup
            }
        };
    }
}

