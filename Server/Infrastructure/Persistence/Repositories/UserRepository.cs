using Microsoft.Extensions.Logging;
using NHibernate;
using NHibernate.Linq;
using Server.Application.Repositories;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ISession _session;
    private readonly ILogger<UserRepository> _logger;

    public UserRepository(ISession session, ILogger<UserRepository> logger)
    {
        _session = session;
        _logger = logger;
    }

    public async Task<User?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        var user = await _session.Query<User>()
            .Fetch(u => u.Team)
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        if (user is null)
        {
            _logger.LogDebug("User with id {UserId} was not found", id);
        }

        return user;
    }
}
