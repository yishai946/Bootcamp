using Server.Domain.Enums;

namespace Server.Domain.Entities
{
    public class User
    {
        public virtual Guid Id { get; protected set; } = default!;
        public virtual string Name { get; set; } = string.Empty;
        public virtual string Username { get; set; } = string.Empty;
        public virtual string Password { get; set; } = string.Empty;
        public virtual Role Role { get; set; }
        public virtual Team Team { get; set; } = default!;

        public virtual IList<Event> Events { get; set; } = [];
        public virtual IList<RecruitExercise> RecruitExercises { get; set; } = [];
    }
}
