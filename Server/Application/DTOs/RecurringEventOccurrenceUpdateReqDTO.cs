using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Application.DTOs
{
    public class RecurringEventOccurrenceUpdateReqDTO
    {
        [Required]
        public DateTime OccurrenceStart { get; set; }

        [Required]
        public string Title { get; set; } = default!;

        public string? Description { get; set; }

        [Required]
        public bool AllDay { get; set; }

        [Required]
        public DateTime Start { get; set; }

        public DateTime? End { get; set; }
    }
}
