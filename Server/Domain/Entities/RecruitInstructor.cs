namespace Server.Domain.Entities
{
    public class RecruitInstructor
    {
        public virtual Guid RecruitId { get; protected set; } = default!;
        public virtual User Recruit { get; set; } = default!;
        public virtual User Instructor { get; set; } = default!;
    }
}
