using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly ITeamExerciseService _teamExerciseService;

    public TeamsController(ITeamExerciseService teamExerciseService)
    {
        _teamExerciseService = teamExerciseService;
    }

    [HttpGet("{teamId}/exercises")]
    public async Task<IActionResult> GetTeamExercises(string teamId, CancellationToken cancellationToken)
    {
        var exercises = await _teamExerciseService.GetTeamExercisesAsync(teamId, cancellationToken);
        return Ok(exercises);
    }
}
