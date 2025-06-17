using LuxPakiernia.Application.DTOs;
using MediatR;

namespace LuxPakiernia.Application.ExerciseInPlan.GetExerciseInPlan;
public class GetExerciseInPlanByIdQuery : IRequest<ExerciseInPlanDto?>
{
    public Guid Id { get; set; }
}
