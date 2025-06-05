using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Interfaces;
using LuxPakiernia.Application.Models;
using LuxPakiernia.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LuxPakiernia.Application.Users.GetCurrentUser;
public class GetCurrentUserQueryHandler : IRequestHandler<GetCurrentUserQuery, Result<UserDTO>>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly UserManager<User> _userManager;

    public GetCurrentUserQueryHandler(ICurrentUserService currentUserService, UserManager<User> userManager)
    {
        _currentUserService = currentUserService;
        _userManager = userManager;
    }

    public async Task<Result<UserDTO>> Handle(GetCurrentUserQuery request, CancellationToken cancellationToken)
    {
        if (!_currentUserService.UserId.HasValue)
        {
            return Result<UserDTO>.Failure(new List<string> { "User not authenticated" });
        }

        var user = await _userManager.FindByIdAsync(_currentUserService.UserId.Value.ToString());

        if (user == null)
        {
            return Result<UserDTO>.Failure(new List<string> { "User not found" });
        }

        return Result<UserDTO>.Success(new UserDTO
        {
            UserId = user.Id,
            Login = user.UserName
        });
    }
}
