using LuxPakiernia.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace LuxPakiernia.Application.Exercises.DeleteExercise;
public class DeleteExerciseCommandHandler : IRequestHandler<DeleteExerciseCommand, bool>
{
    private readonly IExerciseRepository _exerciseRepository;
    private readonly IHttpContextAccessor _http;

    public DeleteExerciseCommandHandler(IExerciseRepository exerciseRepository, IHttpContextAccessor http)
    {
        _http = http;
        _exerciseRepository = exerciseRepository;
    }

    public async Task<bool> Handle(DeleteExerciseCommand request, CancellationToken cancellationToken)
    {
        var userId = _http.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedAccessException("User not logged in");
        var exercise = await _exerciseRepository.GetByIdAsync(request.Id);
        if (exercise == null)
            return false;
        if (exercise.UserId != Guid.Parse(userId))
            return false;
        await _exerciseRepository.DeleteAsync(exercise);
        return true;
    }
}

