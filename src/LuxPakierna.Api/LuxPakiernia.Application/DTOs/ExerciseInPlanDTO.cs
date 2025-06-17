namespace LuxPakiernia.Application.DTOs;
public class ExerciseInPlanDto
{
    public Guid Id { get; set; }
    public Guid ExerciseId { get; set; }
    public int SeriesCount { get; set; }
    public int RepetitionsCount { get; set; }
    public int Weight { get; set; }
    public string Day { get; set; }
    public ExerciseDto? Exercise { get; set; } // optional: dołączone dane ćwiczenia
}