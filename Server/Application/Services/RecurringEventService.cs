using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.Domain.Entities;
using Server.Domain.Enums;
using Server.Infrastructure.Persistence;
using Server.Infrastructure.Security;

namespace Server.Application.Services
{
    public class RecurringEventService
    {
        private readonly Database Database;
        private readonly HierarchyAuthorizationService AuthService;

        public RecurringEventService(Database database, HierarchyAuthorizationService authService)
        {
            Database = database;
            AuthService = authService;
        }

        public List<RecurringEventSeries> GetUserSeries(Guid userId) =>
            Database.Read(session => session.Query<RecurringEventSeries>()
                    .Where(series => series.User.Id == userId)
                    .FetchMany(series => series.Exceptions)
                    .OrderBy(series => series.DtStart).ToList());

        public void Create(RecurringEventReqDTO dto, Guid currentUserId, string currentUserRole)
        {
            AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, dto.UserId);

            Database.Modify(session =>
            {
                var user = session.Get<User>(dto.UserId);

                if (user == null)
                {
                    throw new NotFoundException("User not found");
                }

                var startUtc = DateTime.SpecifyKind(dto.Start, DateTimeKind.Utc);
                DateTime? endUtc = null;

                if (dto.End.HasValue)
                {
                    endUtc = DateTime.SpecifyKind(dto.End.Value, DateTimeKind.Utc);
                }
                else if (dto.AllDay)
                {
                    endUtc = startUtc.AddDays(1);
                }

                if (!dto.AllDay && !endUtc.HasValue)
                {
                    throw new ArgumentException("Non all-day recurring events must include an end time.");
                }

                if (endUtc.HasValue && endUtc.Value <= startUtc)
                {
                    throw new ArgumentException("Event end must be after start time.");
                }

                var duration = endUtc.HasValue ? endUtc.Value - startUtc : TimeSpan.FromDays(1);

                var untilUtc = dto.Until.HasValue ? DateTime.SpecifyKind(dto.Until.Value, DateTimeKind.Utc) : (DateTime?)null;

                if (untilUtc.HasValue && untilUtc.Value <= startUtc)
                {
                    throw new ArgumentException("Recurrence end must be after start time.");
                }

                var series = new RecurringEventSeries
                {
                    User = user,
                    Title = dto.Title,
                    Description = dto.Description,
                    DtStart = startUtc,
                    Duration = duration,
                    RRule = BuildRRule(dto.Frequency, dto.Interval, untilUtc),
                    AllDay = dto.AllDay,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                };

                session.Save(series);
            });
        }

        private static string BuildRRule(RecurrenceFrequency frequency, int interval, DateTime? untilUtc)
        {
            var freqString = frequency switch
            {
                RecurrenceFrequency.Daily => "DAILY",
                RecurrenceFrequency.Weekly => "WEEKLY",
                RecurrenceFrequency.Monthly => "MONTHLY",
                _ => throw new ArgumentOutOfRangeException(nameof(frequency), frequency, null)
            };

            var rule = $"FREQ={freqString};INTERVAL={Math.Max(interval, 1)}";

            if (untilUtc.HasValue)
            {
                rule += $";UNTIL={untilUtc.Value.ToString("yyyyMMdd'T'HHmmss'Z'")}";
            }

            return rule;
        }

        //public void AddException(Guid seriesId, RecurringEventException exception)
        //{
        //    Database.Modify(session =>
        //    {
        //        var series = session.Get<RecurringEventSeries>(seriesId);

        //        if (series == null)
        //        {
        //            throw new NotFoundException("Series not found");
        //        }

        //        exception.Series = series;
        //        series.Exceptions.Add(exception);
        //        session.SaveOrUpdate(series);
        //    });
        //}

        //public void RemoveException(Guid exceptionId)
        //{
        //    Database.Modify(session =>
        //    {
        //        var exception = session.Get<RecurringEventException>(exceptionId);
        //        if (exception != null)
        //            session.Delete(exception);
        //    });
        //}
    }
}
