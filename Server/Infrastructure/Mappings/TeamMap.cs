using FluentNHibernate.Mapping;
using Server.Domain.Entities;

namespace Server.Infrastructure.Mappings;

public class TeamMap : ClassMap<Team>
{
    public TeamMap()
    {
        Table("teams");
        Id(x => x.Id).Column("id").GeneratedBy.Assigned();
        Map(x => x.Name).Column("name").Not.Nullable();
        HasMany(x => x.Members)
            .KeyColumn("team_id")
            .Inverse()
            .Cascade.All();
        HasMany(x => x.Exercises)
            .KeyColumn("team_id")
            .Inverse()
            .Cascade.All();
    }
}
