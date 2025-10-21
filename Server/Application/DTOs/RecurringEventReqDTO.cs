using Server.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Server.Application.DTOs
{
    public class RecurringEventReqDTO
    {
        [Required]
        public Guid UserId { get; set; } = default!;

        [Required]
        public string Title { get; set; } = default!;

        public string? Description { get; set; }

        [Required]
        public bool AllDay { get; set; }

        [Required]
        public DateTime Start { get; set; }

        public DateTime? End { get; set; }

        [Required]
        public RecurrenceFrequency Frequency { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Interval must be at least 1")]
        public int Interval { get; set; } = 1;

        public DateTime? Until { get; set; }
    }
}
