using Microsoft.AspNetCore.Mvc;
using Server.Application.Services;

namespace Server.Controllers;

[ApiController]
[Route("api/users/{userId}/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUserEvents(string userId, CancellationToken cancellationToken)
    {
        var events = await _eventService.GetUserEventsAsync(userId, cancellationToken);
        return Ok(events);
    }
}
