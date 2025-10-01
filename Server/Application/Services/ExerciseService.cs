using Server.Application.DTOs;
using Server.Application.Repositories;

namespace Server.Application.Services;

public interface IExerciseService
{
    Task<ExerciseDto?> GetByIdAsync(string id, CancellationToken cancellationToken = default);
}

public class ExerciseService : IExerciseService
{
    private readonly IExerciseRepository _exerciseRepository;

    public ExerciseService(IExerciseRepository exerciseRepository)
    {
        _exerciseRepository = exerciseRepository;
    }

    public async Task<ExerciseDto?> GetByIdAsync(string id, CancellationToken cancellationToken = default)
    {
        var exercise = await _exerciseRepository.GetByIdAsync(id, cancellationToken);

        return exercise is null
            ? null
            : new ExerciseDto(exercise.Id, exercise.Title, exercise.ContentFile, exercise.WorkDays, exercise.IsRtl);
    }
}
