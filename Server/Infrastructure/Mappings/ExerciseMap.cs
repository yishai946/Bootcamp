using FluentNHibernate.Mapping;
using Server.Domain.Entities;

namespace Server.Infrastructure.Mappings;

public class ExerciseMap : ClassMap<Exercise>
{
    public ExerciseMap()
    {
        Table("exercises");
        Id(x => x.Id).Column("id").GeneratedBy.Assigned();
        Map(x => x.Title).Column("title").Not.Nullable();
        Map(x => x.ContentFile).Column("content_file").Not.Nullable();
        Map(x => x.WorkDays).Column("work_days").Not.Nullable();
        Map(x => x.IsRtl).Column("is_rtl").Not.Nullable();
    }
}
