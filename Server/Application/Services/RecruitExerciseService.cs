using System.Linq;
using Server.Application.DTOs;
using Server.Application.Repositories;
using Server.Domain.Enums;

namespace Server.Application.Services;

public interface IRecruitExerciseService
{
    Task<IReadOnlyCollection<RecruitExerciseDto>> GetByRecruitAsync(string recruitId, CancellationToken cancellationToken = default);
    Task<RecruitExerciseDto?> AdvanceStatusAsync(string exerciseId, CancellationToken cancellationToken = default);
}

public class RecruitExerciseService : IRecruitExerciseService
{
    private readonly IRecruitExerciseRepository _repository;

    public RecruitExerciseService(IRecruitExerciseRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyCollection<RecruitExerciseDto>> GetByRecruitAsync(string recruitId, CancellationToken cancellationToken = default)
    {
        var exercises = await _repository.GetByRecruitIdAsync(recruitId, cancellationToken);
        return exercises
            .Select(MapToDto)
            .ToList();
    }

    public async Task<RecruitExerciseDto?> AdvanceStatusAsync(string exerciseId, CancellationToken cancellationToken = default)
    {
        var exercise = await _repository.GetByIdAsync(exerciseId, cancellationToken);
        if (exercise is null)
        {
            return null;
        }

        exercise.Status = exercise.Status < ExerciseStatus.Done
            ? exercise.Status + 1
            : exercise.Status;

        await _repository.UpdateAsync(exercise, cancellationToken);
        return MapToDto(exercise);
    }

    private static RecruitExerciseDto MapToDto(Domain.Entities.RecruitExercise exercise)
    {
        return new RecruitExerciseDto(
            exercise.Id,
            exercise.Recruit.Id,
            exercise.Exercise.Id,
            exercise.Status,
            exercise.StartDate,
            exercise.CodeReviewDate,
            exercise.FixDate,
            exercise.DoneDate
        );
    }
}
