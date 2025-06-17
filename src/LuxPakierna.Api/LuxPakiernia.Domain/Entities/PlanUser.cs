namespace LuxPakiernia.Domain.Entities;
public class PlanUser
{
    public Guid Id { get; set; }

    public int PlanId { get; set; }
    public Plan Plan { get; set; }

    public Guid UserId { get; set; }
    public User User { get; set; }
}
