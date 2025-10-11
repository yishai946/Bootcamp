namespace Server.Domain.Entities
{
    public class TeamExercise
    {
        public virtual Guid Id { get; protected set; } = default!;
        public virtual Exercise Exercise { get; set; } = default!;
        public virtual Team Team { get; set; } = default!;
        public virtual int Position { get; set; }
        public virtual DateTime CreatedAt { get; set; }
        public virtual DateTime UpdatedAt { get; set; }
    }
}
