namespace Server.Entities
{
    public class Team
    {
        public virtual Guid Id { get; protected set; }
        public virtual string Name { get; set; } = String.Empty;
        public virtual IList<User> Users { get; set; } = [];
        public virtual IList<TeamExercise> TeamExercises { get; set; } = [];

    }
}
