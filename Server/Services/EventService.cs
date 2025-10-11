using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Infrastructure.Persistence;
using Server.Domain.Entities;

namespace Server.Services
{
    public class EventService
    {
        private readonly Database Database;

        public EventService(Database database)
        {
            Database = database;
        }

        public List<EventDTO> GetUserEvents(Guid id, int? limit)
        {
            var events = Database.Read(session =>
            {
                IQueryable<Event> query = session.Query<Event>()
                    .Where(userEvent => userEvent.User.Id == id)
                    .OrderBy(userEvent => userEvent.StartTime);

                if (limit.HasValue)
                    query = query.Take(limit.Value);

                return query.ToList();
            });

            return events.Select(userEvent => ConvertToDTO(userEvent, id)).ToList();
        }

        private EventDTO ConvertToDTO(Event userEvent, Guid userId) =>
            new()
            {
                Id = userEvent.Id,
                CreatedAt = userEvent.CreatedAt,
                Description = userEvent.Description,
                Title = userEvent.Title,
                Type = userEvent.Type,
                End = userEvent.EndTime,
                Start = userEvent.StartTime,
                AllDay = userEvent.AllDay,
                UpdatedAt = userEvent.UpdatedAt,
                UserId = userId
            };
    }
}
