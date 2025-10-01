using Microsoft.Extensions.Logging;
using NHibernate;
using NHibernate.Linq;
using Server.Application.Repositories;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Repositories;

public class ExerciseRepository : IExerciseRepository
{
    private readonly ISession _session;
    private readonly ILogger<ExerciseRepository> _logger;

    public ExerciseRepository(ISession session, ILogger<ExerciseRepository> logger)
    {
        _session = session;
        _logger = logger;
    }

    public async Task<Exercise?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        var exercise = await _session.Query<Exercise>().FirstOrDefaultAsync(x => x.Id == id, cancellationToken);
        if (exercise is null)
        {
            _logger.LogDebug("Exercise with id {ExerciseId} was not found", id);
        }

        return exercise;
    }
}
