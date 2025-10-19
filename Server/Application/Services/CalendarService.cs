using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Server.Application.DTOs;
using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Application.Services
{
    public class CalendarService(
        EventService eventService,
        RecurringEventService recurringService,
        RecurringEventExceptionService exceptionService,
        GlobalDaysOffService globalDayOffService)
    {
        private readonly EventService EventService = eventService;
        private readonly RecurringEventService RecurringService = recurringService;
        private readonly RecurringEventExceptionService ExceptionService = exceptionService;
        private readonly GlobalDaysOffService GlobalDayOffService = globalDayOffService;

        private static readonly HashSet<DayOfWeek> WeekendDays =
        [
            DayOfWeek.Friday,
            DayOfWeek.Saturday
        ];

        public List<EventDTO> GetUserCalendar(Guid userId, int? limit = null, DateTime? from = null, DateTime? to = null)
        {
            var oneTimeEvents = EventService.GetUserEvents(userId, null, from, to);
            var recurringSeries = RecurringService.GetUserSeries(userId);
            var globalDaysOff = GlobalDayOffService.GetAll();

            var expandedRecurring = ExpandRecurringSeries(recurringSeries, from, to);

            var filteredOneTime = oneTimeEvents
                .Where(e => HasOverlap(e.Start, e.End, from, to))
                .ToList();

            var filteredGlobal = globalDaysOff
                .Where(e => HasOverlap(e.Date, e.Date, from, to))
                .Select(e => new EventDTO(e, userId))
                .ToList();

            var allEvents = filteredOneTime
                .Concat(expandedRecurring)
                .Concat(filteredGlobal)
                .OrderBy(e => e.Start)
                .ToList();

            return limit.HasValue ? allEvents.Take(limit.Value).ToList() : allEvents;
        }

        public bool HasOverlap(DateTime start, DateTime? end, DateTime? from = null, DateTime? to = null)
        {
            if (!from.HasValue && !to.HasValue)
                return true;

            var eStart = start;
            var eEnd = end ?? start;

            if (from.HasValue && eEnd < from.Value)
                return false;

            if (to.HasValue && eStart > to.Value)
                return false;

            return true;
        }


        private List<EventDTO> ExpandRecurringSeries(IEnumerable<RecurringEventSeries> seriesList, DateTime? from = null, DateTime? to = null)
        {
            var result = new List<EventDTO>();
            var rangeStart = from ?? DateTime.UtcNow.AddMonths(-1);
            var rangeEnd = to ?? DateTime.UtcNow.AddYears(1);

            foreach (var series in seriesList)
            {
                var calEvent = new CalendarEvent
                {
                    DtStart = new CalDateTime(series.DtStart),
                    Duration = series.Duration,
                    RecurrenceRules = { new RecurrencePattern(series.RRule) }
                };

                var occurrences = calEvent.GetOccurrences(rangeStart, rangeEnd);

                foreach (var occurrence in occurrences)
                {
                    var occurrenceStart = occurrence.Period.StartTime.AsUtc;

                    var exception = series.Exceptions
                        .FirstOrDefault(x => x.OccurrenceStart == occurrenceStart);

                    if (exception == null)
                    {
                        result.Add(new EventDTO(series, occurrenceStart));
                    }
                    else if (exception.Kind == RecurringExceptionKind.Override)
                    {
                        result.Add(new EventDTO(series, exception));
                    }
                }
            }

            return result;
        }

    }
}
