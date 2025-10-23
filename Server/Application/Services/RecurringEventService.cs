using NHibernate;
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

                EnsureUserFound(user);

                var startUtc = DateTime.SpecifyKind(dto.Start, DateTimeKind.Utc);
                DateTime? endUtc = null;

                if (dto.End.HasValue)
                {
                    endUtc = DateTime.SpecifyKind(dto.End.Value, DateTimeKind.Utc);
                    EnsureEndAfterStart(startUtc, endUtc.Value);
                }
                else if (dto.AllDay)
                {
                    endUtc = startUtc.AddDays(1);
                }

                if (!dto.AllDay && !endUtc.HasValue)
                {
                    throw new ArgumentException("Non all-day recurring events must include an end time.");
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
                    RRule = BuildRRule(dto.Frequency, untilUtc),
                    AllDay = dto.AllDay,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                };

                session.Save(series);
            });
        }

        public void UpdateSeries(Guid seriesId, RecurringEventReqDTO dto, Guid currentUserId, string currentUserRole)
        {
            Database.Modify(session =>
            {
                var series = session.Query<RecurringEventSeries>()
                    .Where(s => s.Id == seriesId)
                    .Fetch(s => s.User)
                    .SingleOrDefault();

                EnsureRecurringEventFound(series);

                AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, series!.User.Id);

                if (series.User.Id != dto.UserId)
                {
                    AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, dto.UserId);

                    var newUser = session.Get<User>(dto.UserId);

                    EnsureUserFound(newUser);

                    series.User = newUser!;
                }

                var startUtc = DateTime.SpecifyKind(dto.Start, DateTimeKind.Utc);
                DateTime? endUtc = null;

                if (dto.End.HasValue)
                {
                    endUtc = DateTime.SpecifyKind(dto.End.Value, DateTimeKind.Utc);
                    EnsureEndAfterStart(startUtc, endUtc.Value);
                }
                else if (dto.AllDay)
                {
                    endUtc = startUtc.AddDays(1);
                }

                if (!dto.AllDay && !endUtc.HasValue)
                {
                    throw new ArgumentException("Non all-day recurring events must include an end time.");
                }

                var duration = endUtc.HasValue ? endUtc.Value - startUtc : TimeSpan.FromDays(1);

                var untilUtc = dto.Until.HasValue ? DateTime.SpecifyKind(dto.Until.Value, DateTimeKind.Utc) : (DateTime?)null;

                if (untilUtc.HasValue && untilUtc.Value <= startUtc)
                {
                    throw new ArgumentException("Recurrence end must be after start time.");
                }

                series.Title = dto.Title;
                series.Description = dto.Description;
                series.AllDay = dto.AllDay;
                series.DtStart = startUtc;
                series.Duration = duration;
                series.RRule = BuildRRule(dto.Frequency, untilUtc);
                series.UpdatedAt = DateTime.UtcNow;

                session.Update(series);
            });
        }

        public void Delete(Guid recurringEventId, Guid currentUserId, string currentUserRole)
        {
            Database.Modify(session =>
            {
                var recurringEvent = session.Get<RecurringEventSeries>(recurringEventId);

                EnsureRecurringEventFound(recurringEvent);

                AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, recurringEvent.User.Id);

                session.Delete(recurringEvent);
            });
        }

        public void UpdateOccurrence(Guid seriesId, RecurringEventOccurrenceUpdateReqDTO dto, Guid currentUserId, string currentUserRole)
        {
            Database.Modify(session =>
            {
                var series = session.Query<RecurringEventSeries>()
                    .Where(s => s.Id == seriesId)
                    .Fetch(s => s.User)
                    .SingleOrDefault();

                EnsureRecurringEventFound(series);

                AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, series!.User.Id);

                NHibernateUtil.Initialize(series.Exceptions);

                var occurrenceStartUtc = DateTime.SpecifyKind(dto.OccurrenceStart, DateTimeKind.Utc);
                var newStartUtc = DateTime.SpecifyKind(dto.Start, DateTimeKind.Utc);
                DateTime? newEndUtc = null;

                if (dto.End.HasValue)
                {
                    newEndUtc = DateTime.SpecifyKind(dto.End.Value, DateTimeKind.Utc);
                    EnsureEndAfterStart(newStartUtc, newEndUtc.Value);
                }
                else if (dto.AllDay)
                {
                    newEndUtc = newStartUtc.AddDays(1);
                }

                if (!dto.AllDay && !newEndUtc.HasValue)
                {
                    throw new ArgumentException("Non all-day recurring events must include an end time.");
                }

                var exception = series.Exceptions.FirstOrDefault(e => e.OccurrenceStart == occurrenceStartUtc);

                if (exception == null)
                {
                    exception = new RecurringEventException
                    {
                        Series = series,
                        OccurrenceStart = occurrenceStartUtc,
                        CreatedAt = DateTime.UtcNow,
                    };

                    series.Exceptions.Add(exception);
                }

                exception.Kind = RecurringExceptionKind.Override;
                exception.NewStartTime = newStartUtc;
                exception.NewEndTime = newEndUtc;
                exception.NewAllDay = dto.AllDay;
                exception.NewTitle = dto.Title;
                exception.NewDescription = dto.Description;
                exception.UpdatedAt = DateTime.UtcNow;

                series.UpdatedAt = DateTime.UtcNow;

                session.SaveOrUpdate(exception);
                session.Update(series);
            });
        }

        public void DeleteOccurrence(Guid seriesId, DateTime occurrenceStart, Guid currentUserId, string currentUserRole)
        {
            Database.Modify(session =>
            {
                var series = session.Query<RecurringEventSeries>()
                    .Where(s => s.Id == seriesId)
                    .Fetch(s => s.User)
                    .SingleOrDefault();

                EnsureRecurringEventFound(series);

                AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, series!.User.Id);

                NHibernateUtil.Initialize(series.Exceptions);

                var occurrenceStartUtc = DateTime.SpecifyKind(occurrenceStart, DateTimeKind.Utc);

                var exception = series.Exceptions.FirstOrDefault(e => e.OccurrenceStart == occurrenceStartUtc);

                if (exception == null)
                {
                    exception = new RecurringEventException
                    {
                        Series = series,
                        OccurrenceStart = occurrenceStartUtc,
                        CreatedAt = DateTime.UtcNow,
                    };

                    series.Exceptions.Add(exception);
                }

                exception.Kind = RecurringExceptionKind.Cancel;
                exception.NewStartTime = null;
                exception.NewEndTime = null;
                exception.NewAllDay = null;
                exception.NewTitle = null;
                exception.NewDescription = null;
                exception.UpdatedAt = DateTime.UtcNow;

                series.UpdatedAt = DateTime.UtcNow;

                session.SaveOrUpdate(exception);
                session.Update(series);
            });
        }

        private static string BuildRRule(RecurrenceFrequency frequency, DateTime? untilUtc)
        {
            var freqString = frequency switch
            {
                RecurrenceFrequency.Daily => "DAILY",
                RecurrenceFrequency.Weekly => "WEEKLY",
                RecurrenceFrequency.Monthly => "MONTHLY",
                _ => throw new ArgumentOutOfRangeException(nameof(frequency), frequency, null)
            };

            var rule = $"FREQ={freqString}";

            if (untilUtc.HasValue)
            {
                rule += $";UNTIL={untilUtc.Value.ToString("yyyyMMdd'T'HHmmss'Z'")}";
            }

            return rule;
        }

        private void EnsureRecurringEventFound(RecurringEventSeries? recurringEvent)
        {
            if (recurringEvent == null)
            {
                throw new NotFoundException("Reccuring event not found");
            }
        }

        private void EnsureUserFound(User? user)
        {
            if (user == null)
            {
                throw new NotFoundException("User not found");
            }
        }

        private void EnsureEndAfterStart(DateTime start, DateTime end)
        {
            if (end < start)
            {
                throw new ArgumentException("Event end must be after start time.");
            }
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
