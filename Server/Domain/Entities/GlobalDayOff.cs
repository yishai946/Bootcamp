namespace Server.Domain.Entities
{
    public class GlobalDayOff
    {
        public virtual Guid Id { get; set; }
        public virtual DateTime Date { get; set; }
        public virtual bool AllDay { get; set; } = true;
        public virtual string Title { get; set; } = default!;
        public virtual DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public virtual DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
