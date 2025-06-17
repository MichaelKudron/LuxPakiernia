using LuxPakiernia.Application.ExerciseInPlan.CreateExerciseInPlan;
using LuxPakiernia.Application.ExerciseInPlan.DeleteExerciseInPlan;
using LuxPakiernia.Application.ExerciseInPlan.GetExerciseInPlan;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LuxPakierna.Api.Controllers;

public class ExerciseInPlanController : BaseContrller
{
    private readonly IMediator _mediator;

    public ExerciseInPlanController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(CreateExerciseInPlanCommand command)
    {
        var id = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetById), new { id }, null);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _mediator.Send(new DeleteExerciseInPlanCommand { Id = id });
        return result ? NoContent() : NotFound();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetExerciseInPlanByIdQuery { Id = id });
        return result != null ? Ok(result) : NotFound();
    }


}

