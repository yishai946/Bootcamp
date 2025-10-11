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

        [HttpGet("{id}")]
        [Authorize(Policy = "SameUserOrInstructor")]
        public IActionResult GetAll(Guid id) =>
            Ok(RecruitExerciseService.GetAll(id));

        [HttpGet("{recruitId}/exercise/{exerciseId}")]
        public IActionResult GetByExerciseId(Guid recruitId, Guid exerciseId) =>
            Ok(RecruitExerciseService.GetByExerciseId(recruitId, exerciseId));

        [HttpPatch("{id}/advance")]
        public IActionResult AdvanceStatus(Guid id)
        {
            RecruitExerciseService.AdvanceStatus(id);

            return Ok("Recruit exercise advanced successfully");
        }
    }
}
