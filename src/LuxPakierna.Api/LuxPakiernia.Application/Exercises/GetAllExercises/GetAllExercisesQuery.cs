using LuxPakiernia.Application.DTOs;
using MediatR;

namespace LuxPakiernia.Application.Exercises.GetAllExercises;
public class GetAllExercisesQuery : IRequest<IEnumerable<ExerciseDto>>
{
    public string SortByName { get; set; }
    public string MuscleGroup { get; set; }
}
