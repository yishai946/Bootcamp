using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.DTOs;
using Server.Application.Services;
using Server.Infrastructure.Extensions;

namespace Server.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly EventService EventService;

        public EventController(EventService eventService)
        {
            EventService = eventService;
        }

        [HttpGet("{userId}")]
        [Authorize(Policy = "SameUserOrHigher")]
        public IActionResult GetUserEvents(Guid userId, [FromQuery] int? limit = null, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null) =>
            Ok(EventService.GetUserEvents(userId, limit, from, to));

        [HttpPost]
        public IActionResult Create(EventCreateDTO eventData)
        {
            var currentUserId = User.GetUserId();
            var role = User.GetUserRole();

            EventService.Create(eventData, currentUserId, role);

            return Ok("Event created successfully");
        }

        [HttpDelete("{eventId}")]
        public IActionResult Delete(Guid eventId)
        {
            var currentUserId = User.GetUserId();
            var role = User.GetUserRole();

            EventService.Delete(eventId, currentUserId, role);

            return Ok("Event deleted successfully");
        }
    }
}
