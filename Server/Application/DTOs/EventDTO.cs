using Server.Domain.Enums;

namespace Server.Application.DTOs
{
    public class EventDTO
    {
        public Guid Id { get; set; } = default!;
        public Guid UserId { get; set; } = default!;
        public EventType Type { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public bool AllDay { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
