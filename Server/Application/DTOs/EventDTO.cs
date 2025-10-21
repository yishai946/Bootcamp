using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Application.DTOs
{
    public class EventDTO
    {
        public string Id { get; set; } = default!;
        public Guid UserId { get; set; } = default!;
        public EventType Type { get; set; }
        public string Title { get; set; } = default!;
        public string? Description { get; set; }
        public bool AllDay { get; set; }
        public DateTime Start { get; set; }
        public DateTime? End { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public bool IsRecurring { get; set; }
        public Guid? SeriesId { get; set; }
        public DateTime? OccurrenceStart { get; set; }

        public EventDTO(Event e)
        {
            Id = e.Id.ToString();
            UserId = e.User.Id;
            Type = e.Type;
            Title = e.Title;
            Description = e.Description;
            AllDay = e.AllDay;
            Start = e.StartTime;
            End = e.EndTime;
            CreatedAt = e.CreatedAt;
            UpdatedAt = e.UpdatedAt;
            IsRecurring = false;
        }

        public EventDTO(RecurringEventSeries series, DateTime occurrenceStart)
        {
            Id = $"{series.Id}_{occurrenceStart:yyyyMMddHHmmss}";
            UserId = series.User.Id;
            Type = EventType.Other;
            Title = series.Title;
            Description = series.Description;
            AllDay = series.AllDay;
            Start = occurrenceStart;
            End = occurrenceStart.Add(series.Duration);
            CreatedAt = series.CreatedAt;
            UpdatedAt = series.UpdatedAt;
            IsRecurring = true;
            SeriesId = series.Id;
            OccurrenceStart = occurrenceStart;
        }

        public EventDTO(RecurringEventSeries series, RecurringEventException ex)
        {
            Id = ex.Id.ToString();
            UserId = series.User.Id;
            Type = EventType.Other;
            Title = ex.NewTitle ?? series.Title;
            Description = ex.NewDescription ?? series.Description;
            Start = ex.NewStartTime ?? ex.OccurrenceStart;
            End = ex.NewEndTime ?? (ex.NewStartTime ?? ex.OccurrenceStart).Add(series.Duration);
            AllDay = ex.NewAllDay ?? series.AllDay;
            CreatedAt = ex.CreatedAt;
            UpdatedAt = ex.UpdatedAt;
            IsRecurring = true;
            SeriesId = series.Id;
            OccurrenceStart = ex.OccurrenceStart;
        }

        public EventDTO(GlobalDayOff globalDayOff, Guid userId)
        {
            Id = globalDayOff.Id.ToString();
            UserId = userId;
            Title = globalDayOff.Title;
            Type = EventType.DayOff;
            AllDay = globalDayOff.AllDay;
            Start = globalDayOff.Date;
            End = globalDayOff.Date;
            CreatedAt = globalDayOff.CreatedAt;
            UpdatedAt = globalDayOff.UpdatedAt;
            IsRecurring = false;
        }
    }
}
