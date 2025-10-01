using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/users/{userId}/progress")]
public class ProgressController : ControllerBase
{
    private readonly IProgressService _progressService;

    public ProgressController(IProgressService progressService)
    {
        _progressService = progressService;
    }

    [HttpGet("estimated-completion")]
    public async Task<IActionResult> GetEstimatedCompletion(string userId, CancellationToken cancellationToken)
    {
        var result = await _progressService.GetEstimatedCompletionAsync(userId, cancellationToken);
        return Ok(result);
    }
}
