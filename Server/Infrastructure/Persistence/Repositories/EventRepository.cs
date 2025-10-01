using Microsoft.Extensions.Logging;
using NHibernate;
using NHibernate.Linq;
using Server.Application.Repositories;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Repositories;

public class EventRepository : IEventRepository
{
    private readonly ISession _session;
    private readonly ILogger<EventRepository> _logger;

    public EventRepository(ISession session, ILogger<EventRepository> logger)
    {
        _session = session;
        _logger = logger;
    }

    public async Task<IReadOnlyList<Event>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default)
    {
        var events = await _session.Query<Event>()
            .Where(x => x.User.Id == userId)
            .OrderBy(x => x.Start)
            .ToListAsync(cancellationToken);

        if (events.Count == 0)
        {
            _logger.LogDebug("No events found for user {UserId}", userId);
        }

        return events;
    }
}
