using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;
using Server.Infrastructure.Extensions;

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

        [HttpGet("user/{userId}")]
        [Authorize(Policy = "SameUserOrHigher")]
        public IActionResult GetAll(Guid userId) =>
            Ok(RecruitExerciseService.GetAll(userId));

        [HttpGet("{recruitExerciseId}")]
        [Authorize]
        public IActionResult GetById(Guid recruitExerciseId)
        {
            var currentUserId = User.GetUserId();
            var role = User.GetUserRole();

            return Ok(RecruitExerciseService.GetById(recruitExerciseId, currentUserId, role));
        }

        [HttpPatch("{recruitExerciseId}/advance")]
        [Authorize]
        public IActionResult AdvanceStatus(Guid recruitExerciseId)
        {
            var currentUserId = User.GetUserId();
            var role = User.GetUserRole();

            RecruitExerciseService.AdvanceStatus(recruitExerciseId, currentUserId, role);

            return Ok("Recruit exercise advanced successfully");
        }
    }
}
