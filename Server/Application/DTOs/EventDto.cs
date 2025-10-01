using Server.Domain.Enums;

namespace Server.Application.DTOs;

public record EventDto(
    string Id,
    string UserId,
    EventType Type,
    string Title,
    string? Description,
    DateTime Start,
    DateTime End,
    bool AllDay,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
