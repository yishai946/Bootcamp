using FluentNHibernate.Mapping;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Mappings
{
    public class RecruitInstructorMap : ClassMap<RecruitInstructor>
    {
        public RecruitInstructorMap()
        {
            Table("recruit_instructor");

            Id(recruitInstructor => recruitInstructor.RecruitId).Column("recruit_id").GeneratedBy.GuidComb();

            HasOne(recruitInstructor => recruitInstructor.Recruit)
                .ForeignKey("fk_ri_recruit")
                .Constrained();

            References(recruitInstructor => recruitInstructor.Instructor)
                .Column("instructor_id")
                .Not.Nullable()
                .Unique()
                .ForeignKey("fk_ri_instructor");
        }
    }
}
