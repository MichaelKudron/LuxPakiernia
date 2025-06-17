namespace LuxPakiernia.Domain.Entities;
public class ExerciseInPlan
{
    public Guid Id { get; set; }

    public Guid PlanId { get; set; }
    public Plan Plan { get; set; }

    public Guid ExerciseId { get; set; }
    public Exercise Exercise { get; set; }
    public string Day { get; set; }
    public int SeriesCount { get; set; }
    public int RepetitionsCount { get; set; }
    public int Weight { get; set; }
}

