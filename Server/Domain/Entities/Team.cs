namespace Server.Domain.Entities
{
    public class Team
    {
        public virtual Guid Id { get; protected set; }
        public virtual string Name { get; set; } = String.Empty;
        public virtual List<User> Users { get; set; } = [];
        public virtual List<TeamExercise> TeamExercises { get; set; } = [];

    }
}
