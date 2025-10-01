using Microsoft.Extensions.Logging;
using NHibernate;
using NHibernate.Linq;
using Server.Application.Repositories;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Repositories;

public class RecruitExerciseRepository : IRecruitExerciseRepository
{
    private readonly ISession _session;
    private readonly ILogger<RecruitExerciseRepository> _logger;

    public RecruitExerciseRepository(ISession session, ILogger<RecruitExerciseRepository> logger)
    {
        _session = session;
        _logger = logger;
    }

    public async Task<IReadOnlyList<RecruitExercise>> GetByRecruitIdAsync(string recruitId, CancellationToken cancellationToken = default)
    {
        var exercises = await _session.Query<RecruitExercise>()
            .Fetch(x => x.Exercise)
            .Where(x => x.Recruit.Id == recruitId)
            .ToListAsync(cancellationToken);

        if (exercises.Count == 0)
        {
            _logger.LogDebug("No recruit exercises were found for recruit {RecruitId}", recruitId);
        }

        return exercises;
    }

    public async Task<RecruitExercise?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        var exercise = await _session.Query<RecruitExercise>()
            .Fetch(x => x.Exercise)
            .Fetch(x => x.Recruit)
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken);

        if (exercise is null)
        {
            _logger.LogDebug("Recruit exercise {ExerciseId} was not found", id);
        }

        return exercise;
    }

    public async Task UpdateAsync(RecruitExercise exercise, CancellationToken cancellationToken = default)
    {
        await _session.SaveOrUpdateAsync(exercise, cancellationToken);
        await _session.FlushAsync(cancellationToken);
    }
}
