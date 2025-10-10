using NHibernate.Linq;
using Server.Application.DTOs;
using Server.DB;
using Server.Entities;

namespace Server.Services
{
    public class EventService
    {
        private readonly Database Database;

        public EventService(Database database)
        {
            Database = database;
        }

        public IList<EventDTO> GetUserEvents(Guid id)
        {
            var events = Database.Read(session => session.Query<Event>()
                .Where(userEvent => userEvent.User.Id == id)
                .ToList());

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
