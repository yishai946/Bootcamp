using Server.Domain.Enums;

namespace Server.Application.DTOs;

public record RecruitExerciseDto(
    string Id,
    string RecruitId,
    string ExerciseId,
    ExerciseStatus Status,
    DateTime StartDate,
    DateTime? CodeReviewDate,
    DateTime? FixDate,
    DateTime? DoneDate
);
