using System;
using Server.Domain.Enums;

namespace Server.Domain.Entities;

public class RecruitExercise
{
    public virtual string Id { get; set; } = null!;
    public virtual User Recruit { get; set; } = null!;
    public virtual Exercise Exercise { get; set; } = null!;
    public virtual ExerciseStatus Status { get; set; }
    public virtual DateTime StartDate { get; set; }
    public virtual DateTime? CodeReviewDate { get; set; }
    public virtual DateTime? FixDate { get; set; }
    public virtual DateTime? DoneDate { get; set; }
}
