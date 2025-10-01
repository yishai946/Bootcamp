using FluentNHibernate.Mapping;
using Server.Domain.Entities;

namespace Server.Infrastructure.Mappings;

public class RecruitInstructorMap : ClassMap<RecruitInstructor>
{
    public RecruitInstructorMap()
    {
        Table("recruit_instructors");
        CompositeId()
            .KeyReference(x => x.Recruit, "recruit_id")
            .KeyReference(x => x.Instructor, "instructor_id");
    }
}
