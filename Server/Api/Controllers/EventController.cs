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

        [HttpGet("{id}")]
        public IActionResult GetUserEvents(Guid id, [FromQuery] int? limit = null) =>
            Ok(EventService.GetUserEvents(id, limit));
    }
}
