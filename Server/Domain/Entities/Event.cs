using Server.Domain.Enums;

namespace Server.Domain.Entities
{
    public class Event
    {
        public virtual Guid Id { get; protected set; } = default!;
        public virtual User User { get; set; } = default!;
        public virtual EventType Type { get; set; }
        public virtual string Title { get; set; } = default!;
        public virtual string? Description { get; set; }
        public virtual bool AllDay { get; set; }
        public virtual DateTime StartTime { get; set; }
        public virtual DateTime? EndTime { get; set; } = default!;
        public virtual DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
