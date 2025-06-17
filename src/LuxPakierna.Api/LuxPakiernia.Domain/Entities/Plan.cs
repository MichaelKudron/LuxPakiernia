namespace LuxPakiernia.Domain.Entities;
public class Plan
{
    public Guid Id { get; set; }

    public ICollection<ExerciseInPlan> Exercises { get; set; }
    public ICollection<PlanUser> PlanUsers { get; set; }

}