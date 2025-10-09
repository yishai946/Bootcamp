namespace Server.Entities
{
    public class Exercise
    {
        public virtual Guid Id { get; protected set; } = default!;
        public virtual string Title { get; set; } = default!;
        public virtual string ContentFile { get; set; } = default!;
        public virtual decimal WorkDays { get; set; }
        public virtual bool Rtl { get; set; }

        public virtual IList<TeamExercise> TeamExercises { get; set; } = [];
        public virtual IList<RecruitExercise> RecruitExercises { get; set; } = [];
    }
}
