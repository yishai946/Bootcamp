using Server.Application.DTOs;
using Server.Infrastructure.Persistence;
using Server.Domain.Entities;
using Server.Infrastructure.Security;
using NHibernate.Linq;
using Server.Application.Exceptions;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Server.Application.Services
{
    public class EventService(Database database, HierarchyAuthorizationService authService)
    {
        private readonly Database Database = database;
        private readonly HierarchyAuthorizationService AuthService = authService;

        public List<EventDTO> GetUserEvents(Guid userId, int? limit, DateTime? from = null, DateTime? to = null)
        {
            var events = Database.Read(session =>
            {
                IQueryable<Event> query = session.Query<Event>()
                    .Where(userEvent => userEvent.User.Id == userId)
                    .OrderBy(userEvent => userEvent.StartTime);

                if (from.HasValue)
                    query = query.Where(userEvent => userEvent.EndTime.HasValue ? userEvent.EndTime >= from.Value : userEvent.StartTime >= from.Value);

                if (to.HasValue)
                    query = query.Where(userEvent => userEvent.StartTime <= to.Value);

                if (limit.HasValue)
                    query = query.Take(limit.Value);

                return query.ToList();
            });

            return events.Select(userEvent => new EventDTO(userEvent)).ToList();
        }

        public void Create(EventReqDTO eventData, Guid currentUserId, string currentUserRole)
        {
            AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, eventData.UserId);


            Database.Modify(session =>
            {
                var user = session.Get<User>(eventData.UserId);

                var newEvent = new Event()
                {
                    User = user,
                    Title = eventData.Title,
                    Description = eventData.Description,
                    StartTime = DateTime.SpecifyKind(eventData.Start, DateTimeKind.Utc),
                    AllDay = eventData.AllDay,
                    Type = eventData.Type,
                };

                if (!eventData.AllDay && !eventData.End.HasValue)
                {
                    throw new ArgumentException("Non all-day events must have an end time.");
                }

                if (eventData.End.HasValue)
                {
                    newEvent.EndTime = DateTime.SpecifyKind(eventData.End.Value, DateTimeKind.Utc);
                }

                session.Save(newEvent);
            });
        }

        public void Delete(Guid eventId, Guid currentUserId, string currentUserRole) =>
            Database.Modify(session =>
            {
                var existingEvent = session.Query<Event>()
                    .Where(existingEvent => existingEvent.Id == eventId)
                    .Fetch(existingEvent => existingEvent.User)
                    .SingleOrDefault();

                EnsureEventFound(existingEvent);

                AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, existingEvent!.User.Id);

                session.Delete(existingEvent);
            });

        public void Update(Guid eventId, EventReqDTO updatedData, Guid currentUserId, string currentUserRole)
        {
            Database.Modify(session =>
            {
                var existingEvent = session.Query<Event>()
                    .Where(e => e.Id == eventId)
                    .Fetch(e => e.User)
                    .SingleOrDefault();

                EnsureEventFound(existingEvent);

                AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, existingEvent!.User.Id);

                if (updatedData.UserId != existingEvent.User.Id)
                {
                    var newUser = session.Get<User>(updatedData.UserId);

                    EnsureUserFound(newUser);

                    existingEvent.User = newUser;
                }

                existingEvent.Title = updatedData.Title;
                existingEvent.Description = updatedData.Description;
                existingEvent.Type = updatedData.Type;
                existingEvent.AllDay = updatedData.AllDay;
                existingEvent.StartTime = DateTime.SpecifyKind(updatedData.Start, DateTimeKind.Utc);
                existingEvent.EndTime = updatedData.End.HasValue
                    ? DateTime.SpecifyKind(updatedData.End.Value, DateTimeKind.Utc)
                    : null;

                session.Update(existingEvent);
            });
        }

        private void EnsureUserFound(User? user)
        {
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
        }

        public void EnsureEventFound(Event? @event)
        {
            if (@event == null)
            {
                throw new NotFoundException("Event not found");
            }
        }
    }
}
