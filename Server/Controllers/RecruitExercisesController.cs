using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecruitExercisesController : ControllerBase
{
    private readonly IRecruitExerciseService _recruitExerciseService;

    public RecruitExercisesController(IRecruitExerciseService recruitExerciseService)
    {
        _recruitExerciseService = recruitExerciseService;
    }

    [HttpGet("users/{recruitId}")]
    public async Task<IActionResult> GetForRecruit(string recruitId, CancellationToken cancellationToken)
    {
        var exercises = await _recruitExerciseService.GetByRecruitAsync(recruitId, cancellationToken);
        return Ok(exercises);
    }

    [HttpPost("{exerciseId}/advance")]
    public async Task<IActionResult> AdvanceStatus(string exerciseId, CancellationToken cancellationToken)
    {
        var exercise = await _recruitExerciseService.AdvanceStatusAsync(exerciseId, cancellationToken);
        return exercise is null ? NotFound() : Ok(exercise);
    }
}
