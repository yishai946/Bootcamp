using Server.Domain.Entities;

namespace Server.Application.Repositories;

public interface IRecruitExerciseRepository
{
    Task<IReadOnlyList<RecruitExercise>> GetByRecruitIdAsync(string recruitId, CancellationToken cancellationToken = default);
    Task<RecruitExercise?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
    Task UpdateAsync(RecruitExercise exercise, CancellationToken cancellationToken = default);
}
