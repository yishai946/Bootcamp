using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExercisesController : ControllerBase
{
    private readonly IExerciseService _exerciseService;

    public ExercisesController(IExerciseService exerciseService)
    {
        _exerciseService = exerciseService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetExercise(string id, CancellationToken cancellationToken)
    {
        var exercise = await _exerciseService.GetByIdAsync(id, cancellationToken);
        return exercise is null ? NotFound() : Ok(exercise);
    }
}
