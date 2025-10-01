using Server.Domain.Entities;

namespace Server.Application.Repositories;

public interface IExerciseRepository
{
    Task<Exercise?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
}
