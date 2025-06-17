using MediatR;

namespace LuxPakiernia.Application.ExerciseInPlan.DeleteExerciseInPlan;
public class DeleteExerciseInPlanCommand : IRequest<bool>
{
    public Guid Id { get; set; }
}

