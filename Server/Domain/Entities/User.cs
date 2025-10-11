using Microsoft.Extensions.Logging;
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

        public virtual List<Event> Events { get; set; } = [];
        public virtual List<RecruitExercise> RecruitExercises { get; set; } = [];
    }
}
