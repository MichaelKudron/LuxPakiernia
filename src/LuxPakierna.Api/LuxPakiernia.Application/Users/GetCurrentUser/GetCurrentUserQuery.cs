using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Models;
using MediatR;

namespace LuxPakiernia.Application.Users.GetCurrentUser;
public class GetCurrentUserQuery : IRequest<Result<UserDTO>>
{
}
