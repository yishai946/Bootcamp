using Server.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Server.Application.DTOs
{
    public class EventReqDTO
    {
        [Required]
        public Guid UserId { get; set; } = default!;
        [Required]
        public EventType Type { get; set; }
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
