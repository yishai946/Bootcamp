namespace Server.Domain.Entities
{
    public class RecurringEventSeries
    {
        public virtual Guid Id { get; set; }
        public virtual User User { get; set; } = default!;
        public virtual string Title { get; set; } = default!;
        public virtual string? Description { get; set; }
        public virtual DateTime DtStart { get; set; }
        public virtual TimeSpan Duration { get; set; }
        public virtual string RRule { get; set; } = default!;
        public virtual bool AllDay { get; set; }
        public virtual DateTime CreatedAt { get; set; }
        public virtual DateTime UpdatedAt { get; set; }
        public virtual ISet<RecurringEventException> Exceptions { get; set; } = new HashSet<RecurringEventException>();
    }
}
