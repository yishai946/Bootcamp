using System.Collections.Generic;
using Server.Domain.Enums;

namespace Server.Domain.Entities;

public class User
{
    public virtual string Id { get; set; } = null!;
    public virtual string Name { get; set; } = string.Empty;
    public virtual string Username { get; set; } = string.Empty;
    public virtual Role Role { get; set; }
    public virtual Team Team { get; set; } = null!;
    public virtual IList<RecruitExercise> RecruitExercises { get; protected set; } = new List<RecruitExercise>();
    public virtual IList<RecruitInstructor> RecruitAssignments { get; protected set; } = new List<RecruitInstructor>();
    public virtual IList<RecruitInstructor> InstructorAssignments { get; protected set; } = new List<RecruitInstructor>();
    public virtual IList<Event> Events { get; protected set; } = new List<Event>();
}
