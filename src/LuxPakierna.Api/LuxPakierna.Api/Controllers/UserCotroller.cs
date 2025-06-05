using LuxPakiernia.Application.Users.GetCurrentUser;
using LuxPakiernia.Application.Users.GetUserById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace LuxPakierna.Api.Controllers;

public class UserCotroller : BaseContrller
{
    private readonly IMediator _mediator;

    public UserCotroller(IMediator mediator)
    {
        _mediator = mediator;
    }
    [Authorize]
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var result = await _mediator.Send(new GetCurrentUserQuery());

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(result.Data);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var result = await _mediator.Send(new GetUserByIdQuery { Id = id });

        if (!result.Succeeded)
        {
            return NotFound(result.Errors);
        }

        return Ok(result.Data);
    }
}
