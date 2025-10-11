using FluentNHibernate.Mapping;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Mappings
{
    public class TeamMap : ClassMap<Team>
    {
        public TeamMap()
        {
            Table("teams");

            Id(team => team.Id).Column("id").GeneratedBy.GuidComb();
            Map(team => team.Name).Column("name").Not.Nullable();

            HasMany(team => team.Users)
                .KeyColumn("team_id")
                .Table("users")
                .Inverse()
                .Cascade.None();

            HasMany(team => team.TeamExercises)
                .KeyColumn("team_id")
                .Table("team_exercises")
                .Inverse()
                .Cascade.AllDeleteOrphan();
        }
    }
}
