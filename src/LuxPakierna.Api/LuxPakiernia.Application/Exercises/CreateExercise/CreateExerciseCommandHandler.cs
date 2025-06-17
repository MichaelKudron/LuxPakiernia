using LuxPakiernia.Domain.Entities;
using LuxPakiernia.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
namespace LuxPakiernia.Application.Exercises.CreateExercise;
public class CreateExerciseCommandHandler : IRequestHandler<CreateExerciseCommand, Guid>
{
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IHttpContextAccessor _http;

    public CreateExerciseCommandHandler(IExerciseRepository exerciseRepository, IHttpContextAccessor http)
    {
        _exerciseRepository = exerciseRepository;
        _http = http;
    }

    public async Task<Guid> Handle(CreateExerciseCommand request, CancellationToken cancellationToken)
    {
        var userId = _http.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedAccessException("User not logged in");
        var exercise = new Exercise
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            MuscleGroup = request.MuscleGroup,
            UserId = Guid.Parse(userId)
        };

        await _exerciseRepository.CreateAsync(exercise);
        return exercise.Id;
    }
}
