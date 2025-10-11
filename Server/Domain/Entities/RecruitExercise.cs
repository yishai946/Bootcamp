using Server.Domain.Enums;

namespace Server.Domain.Entities
{
    public class RecruitExercise
    {
        public virtual Guid Id { get; protected set; } = default!;
        public virtual User Recruit { get; set; } = default!;
        public virtual Exercise Exercise { get; set; } = default!;
        public virtual ExerciseStatus Status { get; set; } = ExerciseStatus.NotStarted;

        public virtual DateTime? StartDate { get; set; }
        public virtual DateTime? CrDate { get; set; }
        public virtual DateTime? FixDate { get; set; }
        public virtual DateTime? DoneDate { get; set; }
    }
}
