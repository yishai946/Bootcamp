using FluentNHibernate.Mapping;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Mappings
{
    public class GlobalDaysOffMap : ClassMap<GlobalDayOff>
    {
        public GlobalDaysOffMap()
        {
            Table("global_days_off");
            Id(x => x.Id).Column("id").GeneratedBy.GuidComb();
            Map(x => x.Date).Column("date").Not.Nullable();
            Map(x => x.AllDay).Column("all_day").Not.Nullable();
            Map(x => x.Title).Column("title").Not.Nullable();
            Map(x => x.CreatedAt).Column("created_at");
            Map(x => x.UpdatedAt).Column("updated_at");
        }
    }
}
