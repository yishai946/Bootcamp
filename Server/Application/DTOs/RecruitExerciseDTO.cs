using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Application.DTOs
{
    public class RecruitExerciseDTO
    {
        public Guid Id { get; set; } = default!;
        public Guid RecruitId { get; set; } = default!;
        public ExerciseDTO Exercise { get; set; } = default!;
        public ExerciseStatus Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? FixDate { get; set; }
        public DateTime? CrDate { get; set; }
        public DateTime? DoneDate { get; set; }

        public RecruitExerciseDTO(RecruitExercise recruitExercise)
        {
            Id = recruitExercise.Id;
            RecruitId = recruitExercise.Recruit.Id;
            Exercise = new ExerciseDTO(recruitExercise.Exercise);
            Status = recruitExercise.Status;
            StartDate = recruitExercise.StartDate;
            FixDate = recruitExercise.FixDate;
            CrDate = recruitExercise.CrDate;
            DoneDate = recruitExercise.DoneDate;
        }
    }
}
