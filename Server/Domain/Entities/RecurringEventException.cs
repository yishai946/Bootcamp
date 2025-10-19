using Server.Domain.Enums;

namespace Server.Domain.Entities
{
    public class RecurringEventException
    {
        public virtual Guid Id { get; set; }
        public virtual RecurringEventSeries Series { get; set; } = default!;
        public virtual DateTime OccurrenceStart { get; set; }
        public virtual RecurringExceptionKind Kind { get; set; }

        public virtual DateTime? NewStartTime { get; set; }
        public virtual DateTime? NewEndTime { get; set; }
        public virtual bool? NewAllDay { get; set; }
        public virtual string? NewTitle { get; set; }
        public virtual string? NewDescription { get; set; }

        public virtual DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
