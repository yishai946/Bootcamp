using FluentNHibernate.Mapping;
using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Infrastructure.Mappings;

public class EventMap : ClassMap<Event>
{
    public EventMap()
    {
        Table("events");
        Id(x => x.Id).Column("id").GeneratedBy.Assigned();
        References(x => x.User).Column("user_id").Not.Nullable();
        Map(x => x.Type).Column("type").CustomType<EventType>().Not.Nullable();
        Map(x => x.Title).Column("title").Not.Nullable();
        Map(x => x.Description).Column("description");
        Map(x => x.Start).Column("start_time").Not.Nullable();
        Map(x => x.End).Column("end_time").Not.Nullable();
        Map(x => x.AllDay).Column("all_day").Not.Nullable();
        Map(x => x.CreatedAt).Column("created_at").Not.Nullable();
        Map(x => x.UpdatedAt).Column("updated_at").Not.Nullable();
    }
}
