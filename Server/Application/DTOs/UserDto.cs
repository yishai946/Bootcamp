using Server.Domain.Enums;

namespace Server.Application.DTOs;

public record UserDto(string Id, string Name, string Username, Role Role, string TeamId);
