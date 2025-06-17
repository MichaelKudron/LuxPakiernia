using MediatR;

namespace LuxPakiernia.Application.Exercises.CreateExercise;
public class CreateExerciseCommand : IRequest<Guid>
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string MuscleGroup { get; set; }
}