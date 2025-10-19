using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.Api.Controllers
{
    [ApiController]
    [Authorize(Policy = "SameUserOrHigher")]
    [Route("[controller]")]
    public class CalendarController : ControllerBase
    {
        private readonly CalendarService CalendarService;

        public CalendarController(CalendarService calendarService)
        {
            CalendarService = calendarService;
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserCalendar(Guid userId, [FromQuery] int? limit = null, [FromQuery] DateTime? from = null, [FromQuery] DateTime? to = null) =>
            Ok(CalendarService.GetUserCalendar(userId, limit, from, to));
    }
}
