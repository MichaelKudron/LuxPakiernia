using LuxPakiernia.Application.DTOs;
using LuxPakiernia.Application.Models;
using LuxPakiernia.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace LuxPakiernia.Application.Users.GetUserById;
public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, Result<UserDTO>>
{
    private readonly UserManager<User> _userManager;

    public GetUserByIdQueryHandler(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Result<UserDTO>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        var user = await _userManager.FindByIdAsync(request.Id.ToString());

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
