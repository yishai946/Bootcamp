using FluentNHibernate.Mapping;
using Server.Domain.Entities;
using Server.Infrastructure.Persistence.Types;

namespace Server.Infrastructure.Persistence.Mappings
{
    public class RecurringEventSeriesMap : ClassMap<RecurringEventSeries>
    {
        public RecurringEventSeriesMap()
        {
            Table("recurring_event_series");
            Id(x => x.Id).GeneratedBy.GuidComb();

            References(x => x.User).Column("user_id").Not.Nullable();

            Map(x => x.Duration).Column("duration").CustomType<TimeSpanAsIntervalType>().Not.Nullable();
            Map(x => x.Title).Column("title").Not.Nullable();
            Map(x => x.Description).Column("description");
            Map(x => x.DtStart).Column("dtstart").Not.Nullable();
            Map(x => x.RRule).Column("rrule").Not.Nullable();
            Map(x => x.AllDay).Column("all_day").Not.Nullable();
            Map(x => x.CreatedAt).Column("created_at");
            Map(x => x.UpdatedAt).Column("updated_at");

            HasMany(x => x.Exceptions)
                .KeyColumn("series_id")
                .Inverse()
                .Cascade.AllDeleteOrphan();
        }
    }

}
