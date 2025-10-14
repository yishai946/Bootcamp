using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

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
        public IActionResult GetUserEvents(Guid userId, [FromQuery] int? limit = null) =>
            Ok(EventService.GetUserEvents(userId, limit));
    }
}
