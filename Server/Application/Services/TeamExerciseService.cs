using System.Linq;
using Server.Application.DTOs;
using Server.Application.Repositories;

namespace Server.Application.Services;

public interface ITeamExerciseService
{
    Task<IReadOnlyCollection<ExerciseDto>> GetTeamExercisesAsync(string teamId, CancellationToken cancellationToken = default);
}

public class TeamExerciseService : ITeamExerciseService
{
    private readonly ITeamExerciseRepository _teamExerciseRepository;

    public TeamExerciseService(ITeamExerciseRepository teamExerciseRepository)
    {
        _teamExerciseRepository = teamExerciseRepository;
    }

    public async Task<IReadOnlyCollection<ExerciseDto>> GetTeamExercisesAsync(string teamId, CancellationToken cancellationToken = default)
    {
        var exercises = await _teamExerciseRepository.GetByTeamIdAsync(teamId, cancellationToken);
        return exercises
            .Select(x => new ExerciseDto(x.Exercise.Id, x.Exercise.Title, x.Exercise.ContentFile, x.Exercise.WorkDays, x.Exercise.IsRtl))
            .ToList();
    }
}
