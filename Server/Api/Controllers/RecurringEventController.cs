using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.DTOs;
using Server.Application.Services;
using Server.Infrastructure.Extensions;

namespace Server.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecurringEventController : ControllerBase
    {
        private readonly RecurringEventService RecurringEventService;

        public RecurringEventController(RecurringEventService recurringEventService)
        {
            RecurringEventService = recurringEventService;
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create([FromBody] RecurringEventReqDTO dto)
        {
            var currentUserId = User.GetUserId();
            var role = User.GetUserRole();

            RecurringEventService.Create(dto, currentUserId, role);

            return Ok("Recurring event created successfully");
        }

        [HttpDelete("{recurringEventId}")]
        [Authorize]
        public IActionResult Delete(Guid recurringEventId)
        {
            var currentUserId = User.GetUserId();
            var role = User.GetUserRole();

            RecurringEventService.Delete(recurringEventId, currentUserId, role);

            return Ok("Recurring event deleted successfully");
        }
    }
}
