using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Domain.Repositories;
using MediatR;

namespace LuxPakiernia.Application.Users.GetUserPlanWithDetail;
public class GetUserPlanWithDetailsQueryHandler : IRequestHandler<GetUserPlanWithDetailsQuery, IEnumerable<ExerciseInPlanDto>>
{
    private readonly IExerciseInPlanRepository _repo;

    public GetUserPlanWithDetailsQueryHandler(IExerciseInPlanRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ExerciseInPlanDto>> Handle(GetUserPlanWithDetailsQuery request, CancellationToken cancellationToken)
    {
        var data = await _repo.GetAllWithExerciseAsync();

        return data
            .Where(x => x.Plan.UserId == request.UserId)
            .Select(x => new ExerciseInPlanDto
            {
                Id = x.Id,
                ExerciseId = x.ExerciseId,
                SeriesCount = x.SeriesCount,
                RepetitionsCount = x.RepetitionsCount,
                Weight = x.Weight,
                Day = x.Day,
                Exercise = new ExerciseDto
                {
                    Id = x.Exercise.Id,
                    Name = x.Exercise.Name,
                    Description = x.Exercise.Description,
                    MuscleGroup = x.Exercise.MuscleGroup
                }
            });
    }
}
