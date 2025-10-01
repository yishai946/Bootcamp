using System.Collections.Generic;

namespace Server.Domain.Entities;

public class Team
{
    public virtual string Id { get; set; } = null!;
    public virtual string Name { get; set; } = string.Empty;
    public virtual IList<User> Members { get; protected set; } = new List<User>();
    public virtual IList<TeamExercise> Exercises { get; protected set; } = new List<TeamExercise>();
}
