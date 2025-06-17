using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Domain.Repositories;
using MediatR;

namespace LuxPakiernia.Application.Exercises.GetExerciseById;
public class GetExerciseByIdQueryHandler : IRequestHandler<GetExerciseByIdQuery, ExerciseDto?>
{
    private readonly IExerciseRepository _repo;

    public GetExerciseByIdQueryHandler(IExerciseRepository repo)
    {
        _repo = repo;
    }

    public async Task<ExerciseDto?> Handle(GetExerciseByIdQuery request, CancellationToken cancellationToken)
    {
        var e = await _repo.GetByIdAsync(request.Id);
        return e == null ? null : new ExerciseDto
        {
            Id = e.Id,
            Name = e.Name,
            Description = e.Description,
            MuscleGroup = e.MuscleGroup
        };
    }
}
