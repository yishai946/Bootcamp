using Server.Domain.Enums;

namespace Server.Entities
{
    public class Event
    {
        public virtual Guid Id { get; protected set; } = default!;
        public virtual User User { get; set; } = default!;
        public virtual EventType Type { get; set; }

        public virtual string Title { get; set; } = default!;
        public virtual string? Description { get; set; }

        public virtual DateTime StartTime { get; set; }
        public virtual DateTime CrTime { get; set; }
        public virtual DateTime FixTime { get; set; }
        public virtual DateTime DoneTime { get; set; }

        public virtual DateTime CreatedAt { get; set; }
        public virtual DateTime UpdatedAt { get; set; }
    }
}
