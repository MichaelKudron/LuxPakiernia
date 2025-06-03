using LuxPakiernia.Application.Models;
using LuxPakiernia.Infrastructure.Application.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace LuxPakiernia.Application.Auth.Register;
public RegisterCommandHandler(UserManager<User> userManager, ITokenService tokenService)
{
    _userManager = userManager;
    _tokenService = tokenService;
}
public async Task<Result<AuthResponse>> Handle(RegisterCommand request, CancellationToken cancellationToken)
{
    if (request.Password != request.PasswordConfirm)
    {
        return Result<AuthResponse>.Failure(new List<string> { "Passwords do not match" });
    }

    var user = new ApplicationUser
    {
        Id = Guid.NewGuid(),
        UserName = request.Login,
        CreatedAt = DateTime.UtcNow
    };

    var result = await _userManager.CreateAsync(user, request.Password);

    if (!result.Succeeded)
    {
        return Result<AuthResponse>.Failure(result.Errors.Select(e => e.Description).ToList());
    }

    var token = _tokenService.GenerateToken(user);

    return Result<AuthResponse>.Success(new AuthResponse
    {
        Token = token,
        UserId = user.Id,
        Login = user.UserName
    });
}