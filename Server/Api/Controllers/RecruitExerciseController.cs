using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecruitExerciseController : ControllerBase
    {
        private readonly RecruitExerciseService RecruitExerciseService;

        public RecruitExerciseController(RecruitExerciseService recruitExerciseService)
        {
            RecruitExerciseService = recruitExerciseService;
        }

        [HttpGet("{userId}")]
        public IActionResult GetAll(Guid userId) =>
            Ok(RecruitExerciseService.GetAll(userId));

        [HttpGet("{userId}/exercise/{exerciseId}")]
        public IActionResult GetByExerciseId(Guid userId, Guid exerciseId) =>
            Ok(RecruitExerciseService.GetByExerciseId(userId, exerciseId));

        [HttpPatch("{userId}/exercise/{exerciseId}/advance")]
        public IActionResult AdvanceStatus(Guid userId, Guid exerciseId)
        {
            RecruitExerciseService.AdvanceStatus(userId, exerciseId);

            return Ok("Recruit exercise advanced successfully");
        }
    }
}
