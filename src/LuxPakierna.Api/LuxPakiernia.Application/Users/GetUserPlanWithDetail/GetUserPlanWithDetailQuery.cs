using LuxPakiernia.Application.DTOs;
using MediatR;

namespace LuxPakiernia.Application.Users.GetUserPlanWithDetail;
public class GetUserPlanWithDetailsQuery : IRequest<IEnumerable<ExerciseInPlanDto>>
{
    public Guid UserId { get; set; }
}