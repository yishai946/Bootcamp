using FluentNHibernate.Mapping;
using Server.Domain.Enums;
using Server.Entities;

namespace Server.Mappings
{
    public class EventMap : ClassMap<Event>
    {
        public EventMap()
        {
            Table("events");

            Id(x => x.Id).Column("id").GeneratedBy.GuidComb();

            References(x => x.User)
                .Column("user_id")
                .Not.Nullable()
                .ForeignKey("fk_events_user");

            Map(x => x.Type)
                .Column("type")
                .CustomType<EventType>()
                .Not.Nullable();

            Map(x => x.Title).Column("title").Not.Nullable();
            Map(x => x.Description).Column("description");

            Map(x => x.StartTime).Column("start_time").Not.Nullable();
            Map(x => x.CrTime).Column("cr_time").Not.Nullable();
            Map(x => x.FixTime).Column("fix_time").Not.Nullable();
            Map(x => x.DoneTime).Column("done_time").Not.Nullable();

            Map(x => x.CreatedAt).Column("created_at").Not.Nullable();
            Map(x => x.UpdatedAt).Column("updated_at").Not.Nullable();
        }
    }
}

