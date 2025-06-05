using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Interfaces;
using LuxPakiernia.Application.Models;
using LuxPakiernia.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
namespace LuxPakiernia.Application.Auth.Register;
public class RegisterCommandHandler(
        UserManager<User> userManager,
        ITokenService tokenService) : IRequestHandler<RegisterCommand, Result<UserDTO>>
{
    public async Task<Result<UserDTO>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        if (request.Password != request.PasswordConfirm)
        {
            return Result<UserDTO>.Failure(new List<string> { "Passwords do not match" });
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            UserName = request.Login,
            CreatedAt = DateTime.UtcNow
        };

        var result = await userManager.CreateAsync(user, request.Password);

        if (!result.Succeeded)
        {
            return Result<UserDTO>.Failure(result.Errors.Select(e => e.Description).ToList());
        }

        var token = tokenService.GenerateToken(user);

        return Result<UserDTO>.Success(new UserDTO
        {
            Token = token,
            UserId = user.Id,
            Login = user.UserName
        });
    }
}
