using System;

namespace Server.Domain.Entities;

public class RecruitInstructor
{
    public virtual User Recruit { get; set; } = null!;
    public virtual User Instructor { get; set; } = null!;

    public override bool Equals(object? obj)
    {
        if (obj is not RecruitInstructor other)
        {
            return false;
        }

        return Equals(Recruit?.Id, other.Recruit?.Id) && Equals(Instructor?.Id, other.Instructor?.Id);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Recruit?.Id, Instructor?.Id);
    }
}
