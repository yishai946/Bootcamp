using FluentNHibernate.Mapping;
using NHibernate.Type;
using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Infrastructure.Persistence.Mappings
{
    public class RecurringEventExceptionMap : ClassMap<RecurringEventException>
    {
        public RecurringEventExceptionMap()
        {
            Table("recurring_event_exceptions");
            Id(x => x.Id).GeneratedBy.GuidComb();

            References(x => x.Series, "series_id").Not.Nullable();

            Map(x => x.OccurrenceStart).Column("occurrence_start");
            Map(x => x.Kind).CustomType<EnumStringType<RecurringExceptionKind>>();
            Map(x => x.NewStartTime).Column("new_start_time");
            Map(x => x.NewEndTime).Column("new_end_time");
            Map(x => x.NewAllDay).Column("new_all_day");
            Map(x => x.NewTitle).Column("new_title");
            Map(x => x.NewDescription).Column("new_description");
            Map(x => x.CreatedAt).Column("created_at");
            Map(x => x.UpdatedAt).Column("updated_at");
        }
    }
}
