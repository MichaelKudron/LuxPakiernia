using MediatR;

namespace LuxPakiernia.Application.ExerciseInPlan.CreateExerciseInPlan;
public class CreateExerciseInPlanCommand : IRequest<Guid>
{
    public Guid ExerciseId { get; set; }
    public int SeriesCount { get; set; }
    public int RepetitionsCount { get; set; }
    public int Weight { get; set; }
    public string Day { get; set; }
}
