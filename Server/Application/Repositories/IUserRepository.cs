using Server.Domain.Entities;

namespace Server.Application.Repositories;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
}
