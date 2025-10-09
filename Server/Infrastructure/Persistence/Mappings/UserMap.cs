using FluentNHibernate.Mapping;
using Server.Domain.Enums;
using Server.Entities;

namespace Server.Mappings
{
    public class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Table("users");
            Id(user => user.Id).Column("id").GeneratedBy.GuidComb();
            Map(user => user.Username).Column("username").Not.Nullable();
            Map(user => user.Password).Column("password").Not.Nullable();
            Map(user => user.Name).Column("name").Not.Nullable(); ;
            Map(user => user.Role).Column("role").CustomType<Role>().Not.Nullable();

            References(user => user.Team).Column("team_id")
                .ForeignKey("fk_users_team")
                .Not.LazyLoad();

            HasMany(user => user.Events)
                .KeyColumn("user_id")
                .Table("events")
                .Inverse()
                .Cascade.None();

            HasMany(user => user.RecruitExercises)
                .KeyColumn("recruit_id")
                .Table("recruit_exercises")
                .Inverse()
                .Cascade.None();
        }
    }
}
