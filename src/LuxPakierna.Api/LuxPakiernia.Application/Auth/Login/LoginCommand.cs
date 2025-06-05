using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Models;
using MediatR;

namespace LuxPakiernia.Application.Auth.Login;
public class LoginCommand : IRequest<Result<UserDTO>>
{
    public string Login { get; set; }
    public string Password { get; set; }
}
