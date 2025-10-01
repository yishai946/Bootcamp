using Server.Domain.Entities;

namespace Server.Application.Repositories;

public interface IEventRepository
{
    Task<IReadOnlyList<Event>> GetByUserIdAsync(string userId, CancellationToken cancellationToken = default);
}
