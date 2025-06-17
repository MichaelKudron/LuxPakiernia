using MediatR;

namespace LuxPakiernia.Application.Exercises.DeleteExercise;
public class DeleteExerciseCommand : IRequest<bool>
{
    public Guid? Id { get; set; }
}
