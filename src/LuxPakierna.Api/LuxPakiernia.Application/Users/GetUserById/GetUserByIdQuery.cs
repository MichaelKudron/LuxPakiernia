using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Models;
using MediatR;

namespace LuxPakiernia.Application.Users.GetUserById;
public class GetUserByIdQuery : IRequest<Result<UserDTO>>
{
    public Guid Id { get; set; }
}
