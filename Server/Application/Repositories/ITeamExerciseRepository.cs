using Server.Domain.Entities;

namespace Server.Application.Repositories;

public interface ITeamExerciseRepository
{
    Task<IReadOnlyList<TeamExercise>> GetByTeamIdAsync(string teamId, CancellationToken cancellationToken = default);
}
