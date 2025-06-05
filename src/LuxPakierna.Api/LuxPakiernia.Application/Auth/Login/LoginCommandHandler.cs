using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Interfaces;
using LuxPakiernia.Application.Models;
using LuxPakiernia.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LuxPakiernia.Application.Auth.Login;
public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<UserDTO>>
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ITokenService _tokenService;

    public LoginCommandHandler(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    public async Task<Result<UserDTO>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Login);

        if (user == null)
        {
            return Result<UserDTO>.Failure(new List<string> { "Invalid login credentials" });
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!result.Succeeded)
        {
            return Result<UserDTO>.Failure(new List<string> { "Invalid login credentials" });
        }

        var token = _tokenService.GenerateToken(user);

        return Result<UserDTO>.Success(new UserDTO
        {
            Token = token,
            UserId = user.Id,
            Login = user.UserName
        });
    }
}