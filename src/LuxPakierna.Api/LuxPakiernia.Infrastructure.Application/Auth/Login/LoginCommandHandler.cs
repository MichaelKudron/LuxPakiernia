using LuxPakiernia.Application.Models;
using LuxPakiernia.Infrastructure.Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LuxPakiernia.Application.Auth.Login;
public class LoginCommandHandler : IRequestHandler<LoginCommand, Result<LoginDTO>>
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenService _tokenService;

    public LoginCommandHandler(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    public async Task<Result<AuthResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByNameAsync(request.Login);

        if (user == null)
        {
            return Result<AuthResponse>.Failure(new List<string> { "Invalid login credentials" });
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

        if (!result.Succeeded)
        {
            return Result<AuthResponse>.Failure(new List<string> { "Invalid login credentials" });
        }

        var token = _tokenService.GenerateToken(user);

        return Result<AuthResponse>.Success(new AuthResponse
        {
            Token = token,
            UserId = user.Id,
            Login = user.UserName
        });
    }
}
}