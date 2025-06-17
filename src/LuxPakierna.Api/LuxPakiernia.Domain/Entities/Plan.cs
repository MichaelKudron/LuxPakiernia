namespace LuxPakiernia.Domain.Entities;
public class Plan
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public User User { get; set; }

    public ICollection<ExerciseInPlan> ExercisesInPlans { get; set; }
}
