using FluentNHibernate.Mapping;
using Server.Domain.Entities;

namespace Server.Infrastructure.Mappings;

public class TeamExerciseMap : ClassMap<TeamExercise>
{
    public TeamExerciseMap()
    {
        Table("team_exercises");
        Id(x => x.Id).Column("id").GeneratedBy.Assigned();
        References(x => x.Team).Column("team_id").Not.Nullable();
        References(x => x.Exercise).Column("exercise_id").Not.Nullable();
        Map(x => x.SortOrder).Column("sort_order").Not.Nullable();
    }
}
