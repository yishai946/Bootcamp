using System;
using System.Linq;
using Server.Application.DTOs;
using Server.Application.Repositories;

namespace Server.Application.Services;

public interface IProgressService
{
    Task<EstimatedCompletionDto> GetEstimatedCompletionAsync(string recruitId, CancellationToken cancellationToken = default);
}

public class ProgressService : IProgressService
{
    private readonly IRecruitExerciseRepository _recruitExerciseRepository;

    public ProgressService(IRecruitExerciseRepository recruitExerciseRepository)
    {
        _recruitExerciseRepository = recruitExerciseRepository;
    }

    public async Task<EstimatedCompletionDto> GetEstimatedCompletionAsync(string recruitId, CancellationToken cancellationToken = default)
    {
        var exercises = await _recruitExerciseRepository.GetByRecruitIdAsync(recruitId, cancellationToken);
        if (exercises.Count == 0)
        {
            return new EstimatedCompletionDto(null, 0);
        }

        var latest = exercises
            .Where(e => e.DoneDate.HasValue)
            .OrderByDescending(e => e.DoneDate)
            .FirstOrDefault();

        var totalWorkDays = exercises.Sum(e => (int)Math.Round(e.Exercise.WorkDays));

        return new EstimatedCompletionDto(latest?.DoneDate, totalWorkDays);
    }
}
