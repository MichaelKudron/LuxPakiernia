using LuxPakiernia.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace LuxPakiernia.Application.ExerciseInPlan.CreateExerciseInPlan;
public class CreateExerciseInPlanCommandHandler : IRequestHandler<CreateExerciseInPlanCommand, Guid>
{
    private readonly IPlanRepository _planRepo;
    private readonly IExerciseInPlanRepository _repo;
    private readonly IHttpContextAccessor _http;
    public CreateExerciseInPlanCommandHandler(IPlanRepository planRepo, IExerciseInPlanRepository repo, IHttpContextAccessor http)
    {
        _http = http;
        _planRepo = planRepo;
        _repo = repo;
    }

    public async Task<Guid> Handle(CreateExerciseInPlanCommand request, CancellationToken cancellationToken)
    {
        var userId = _http.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
            throw new UnauthorizedAccessException("User not logged in");
        var plan = await _planRepo.GetByUserIdAsync(Guid.Parse(userId));
        if (plan == null) throw new Exception("Plan not found");

        var entity = new Domain.Entities.ExerciseInPlan
        {
            Id = Guid.NewGuid(),
            PlanId = plan.Id,
            ExerciseId = request.ExerciseId,
            SeriesCount = request.SeriesCount,
            RepetitionsCount = request.RepetitionsCount,
            Weight = request.Weight,
            Day = request.Day
        };

        await _repo.CreateAsync(entity);
        return entity.Id;
    }
}

