using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Models;
using MediatR;
namespace LuxPakiernia.Application.Auth.Register;
public class RegisterCommand : IRequest<Result<UserDTO>>
{
    public string Login { get; set; }
    public string Password { get; set; }
    public string PasswordConfirm { get; set; }
}
