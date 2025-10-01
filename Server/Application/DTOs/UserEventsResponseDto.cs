namespace Server.Application.DTOs;

public record UserEventsResponseDto(IReadOnlyCollection<EventDto> Events, IReadOnlyCollection<EventDto> UpcomingEvents);
