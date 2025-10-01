using Microsoft.Extensions.Logging;
using NHibernate;
using NHibernate.Linq;
using Server.Application.Repositories;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Repositories;

public class TeamExerciseRepository : ITeamExerciseRepository
{
    private readonly ISession _session;
    private readonly ILogger<TeamExerciseRepository> _logger;

    public TeamExerciseRepository(ISession session, ILogger<TeamExerciseRepository> logger)
    {
        _session = session;
        _logger = logger;
    }

    public async Task<IReadOnlyList<TeamExercise>> GetByTeamIdAsync(string teamId, CancellationToken cancellationToken = default)
    {
        var exercises = await _session.Query<TeamExercise>()
            .Fetch(x => x.Exercise)
            .Where(x => x.Team.Id == teamId)
            .OrderBy(x => x.SortOrder)
            .ToListAsync(cancellationToken);

        if (exercises.Count == 0)
        {
            _logger.LogDebug("No team exercises were found for team {TeamId}", teamId);
        }

        return exercises;
    }
}
