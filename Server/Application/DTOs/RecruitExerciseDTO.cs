using Server.Domain.Enums;
using Server.Entities;

namespace Server.Application.DTOs
{
    public class RecruitExerciseDTO
    {
        public Guid Id { get; set; } = default!;
        public Guid RecruitId { get; set; } = default!;
        public Exercise Exercise { get; set; } = default!;
        public ExerciseStatus Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FixDate { get; set; }
        public DateTime? CrDate { get; set; }
        public DateTime? DoneDate { get; set; }
    }
}
