using FluentNHibernate.Mapping;
using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Infrastructure.Mappings;

public class UserMap : ClassMap<User>
{
    public UserMap()
    {
        Table("users");
        Id(x => x.Id).Column("id").GeneratedBy.Assigned();
        Map(x => x.Name).Column("name").Not.Nullable();
        Map(x => x.Username).Column("username").Not.Nullable();
        Map(x => x.Role).Column("role").CustomType<Role>().Not.Nullable();
        References(x => x.Team).Column("team_id").Not.Nullable();
        HasMany(x => x.RecruitExercises)
            .KeyColumn("recruit_id")
            .Inverse()
            .Cascade.All();
        HasMany(x => x.RecruitAssignments)
            .KeyColumn("recruit_id")
            .Inverse()
            .Cascade.All();
        HasMany(x => x.InstructorAssignments)
            .KeyColumn("instructor_id")
            .Inverse()
            .Cascade.All();
        HasMany(x => x.Events)
            .KeyColumn("user_id")
            .Inverse()
            .Cascade.All();
    }
}
