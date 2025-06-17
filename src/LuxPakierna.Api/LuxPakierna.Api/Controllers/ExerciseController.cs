using LuxPakiernia.Application.Exercises.CreateExercise;
using LuxPakiernia.Application.Exercises.DeleteExercise;
using LuxPakiernia.Application.Exercises.GetAllExercises;
using LuxPakiernia.Application.Exercises.GetExerciseById;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuxPakierna.Api.Controllers;


public class ExerciseController : BaseContrller
{
    private readonly IMediator _mediator;

    public ExerciseController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("GetAllExercisess")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new GetAllExercisesQuery());
        return Ok(result);
    }

    [HttpGet("GetById: {id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetExerciseByIdQuery { Id = id });
        return result == null ? NotFound() : Ok(result);
    }

    [Authorize]
    [HttpPost("CreateExerciseCommand")]
    public async Task<IActionResult> Create(CreateExerciseCommand command)
    {
        var id = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id }, null);
    }
    [Authorize]
    [HttpDelete("DeleteExercise")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var isDeleted = await _mediator.Send(new DeleteExerciseCommand { Id = id });
        return CreatedAtAction(nameof(Delete), new { isDeleted }, null);
    }
}