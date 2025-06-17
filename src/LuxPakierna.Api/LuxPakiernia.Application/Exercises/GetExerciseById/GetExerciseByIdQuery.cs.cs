using LuxPakiernia.Application.DTOs;
using MediatR;

namespace LuxPakiernia.Application.Exercises.GetExerciseById;
public class GetExerciseByIdQuery : IRequest<ExerciseDto?>
{
    public Guid Id { get; set; }
}
