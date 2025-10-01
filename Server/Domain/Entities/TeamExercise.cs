namespace Server.Domain.Entities;

public class TeamExercise
{
    public virtual string Id { get; set; } = null!;
    public virtual Team Team { get; set; } = null!;
    public virtual Exercise Exercise { get; set; } = null!;
    public virtual int SortOrder { get; set; }
}
