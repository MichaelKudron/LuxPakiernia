using LuxPakiernia.Domain.Repositories;
using MediatR;

namespace LuxPakiernia.Application.ExerciseInPlan.DeleteExerciseInPlan;
public class DeleteExerciseInPlanCommandHandler : IRequestHandler<DeleteExerciseInPlanCommand, bool>
{
    private readonly IExerciseInPlanRepository _repo;

    public DeleteExerciseInPlanCommandHandler(IExerciseInPlanRepository repo)
    {
        _repo = repo;
    }

    public async Task<bool> Handle(DeleteExerciseInPlanCommand request, CancellationToken cancellationToken)
    {
        var entity = await _repo.GetByIdAsync(request.Id);
        if (entity == null) return false;

        await _repo.DeleteAsync(entity);
        return true;
    }
}