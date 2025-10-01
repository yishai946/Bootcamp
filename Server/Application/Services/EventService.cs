using System;
using System.Linq;
using Server.Application.DTOs;
using Server.Application.Repositories;

namespace Server.Application.Services;

public interface IEventService
{
    Task<UserEventsResponseDto> GetUserEventsAsync(string userId, CancellationToken cancellationToken = default);
}

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;

    public EventService(IEventRepository eventRepository)
    {
        _eventRepository = eventRepository;
    }

    public async Task<UserEventsResponseDto> GetUserEventsAsync(string userId, CancellationToken cancellationToken = default)
    {
        var events = await _eventRepository.GetByUserIdAsync(userId, cancellationToken);
        var eventDtos = events
            .Select(MapToDto)
            .ToList();

        var upcoming = eventDtos
            .Where(e => e.Start >= DateTime.UtcNow)
            .OrderBy(e => e.Start)
            .Take(3)
            .ToList();

        return new UserEventsResponseDto(eventDtos, upcoming);
    }

    private static EventDto MapToDto(Domain.Entities.Event @event)
    {
        return new EventDto(
            @event.Id,
            @event.User.Id,
            @event.Type,
            @event.Title,
            @event.Description,
            @event.Start,
            @event.End,
            @event.AllDay,
            @event.CreatedAt,
            @event.UpdatedAt
        );
    }
}
