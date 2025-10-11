using FluentNHibernate.Mapping;
using Server.Entities;

namespace Server.Mappings
{
    public class ExerciseMap : ClassMap<Exercise>
    {
        public ExerciseMap()
        {
            Table("exercises");

            Id(exercise => exercise.Id).Column("id").GeneratedBy.GuidComb();
            Map(exercise => exercise.Title).Column("title").Not.Nullable();
            Map(exercise => exercise.ContentFile).Column("content_file").Not.Nullable();
            Map(exercise => exercise.WorkDays).Column("work_days").Not.Nullable().Precision(3).Scale(1);
            Map(exercise => exercise.Rtl).Column("rtl").Not.Nullable();
        }
    }
}
