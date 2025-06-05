using LuxPakiernia.Application.Auth.Login;
using LuxPakiernia.Application.Auth.Register;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace LuxPakierna.Api.Controllers;

public class AuthController : BaseContrller
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(result.Data);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginCommand command)
    {
        var result = await _mediator.Send(command);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok(result.Data);
    }

}
