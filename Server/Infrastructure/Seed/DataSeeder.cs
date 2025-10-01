using System.IO;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using NHibernate;
using NHibernate.Linq;
using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Infrastructure.Seed;

public class DataSeeder
{
    private readonly ISessionFactory _sessionFactory;
    private readonly ILogger<DataSeeder> _logger;
    private readonly IWebHostEnvironment _environment;

    public DataSeeder(ISessionFactory sessionFactory, ILogger<DataSeeder> logger, IWebHostEnvironment environment)
    {
        _sessionFactory = sessionFactory;
        _logger = logger;
        _environment = environment;
    }

    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        await using var session = _sessionFactory.OpenSession();
        using var transaction = session.BeginTransaction();

        var hasUsers = await session.Query<User>().AnyAsync(cancellationToken);
        if (hasUsers)
        {
            _logger.LogInformation("Database already contains data. Skipping seeding.");
            await transaction.RollbackAsync(cancellationToken);
            return;
        }

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var seedDirectory = Path.Combine(_environment.ContentRootPath, "SeedData");

        var teams = await LoadAsync<List<TeamSeedModel>>(seedDirectory, "teams.json", options, cancellationToken) ?? new();
        var exercises = await LoadAsync<List<ExerciseSeedModel>>(seedDirectory, "exercises.json", options, cancellationToken) ?? new();
        var users = await LoadAsync<List<UserSeedModel>>(seedDirectory, "users.json", options, cancellationToken) ?? new();
        var teamExercises = await LoadAsync<List<TeamExerciseSeedModel>>(seedDirectory, "TeamExercises.json", options, cancellationToken) ?? new();
        var recruitExercises = await LoadAsync<List<RecruitExerciseSeedModel>>(seedDirectory, "RecruitExercises.json", options, cancellationToken) ?? new();
        var events = await LoadAsync<List<EventSeedModel>>(seedDirectory, "events.json", options, cancellationToken) ?? new();
        var recruitInstructors = await LoadAsync<List<RecruitInstructorSeedModel>>(seedDirectory, "RecruitInstructor.json", options, cancellationToken) ?? new();

        var teamEntities = teams.ToDictionary(t => t.Id, t => new Team { Id = t.Id, Name = t.Name });
        foreach (var team in teamEntities.Values)
        {
            await session.SaveAsync(team, cancellationToken);
        }

        var exerciseEntities = exercises.ToDictionary(e => e.Id, e => new Exercise
        {
            Id = e.Id,
            Title = e.Title,
            ContentFile = e.ContentFile,
            WorkDays = e.WorkDays,
            IsRtl = e.Rtl
        });

        foreach (var exercise in exerciseEntities.Values)
        {
            await session.SaveAsync(exercise, cancellationToken);
        }

        var userEntities = new Dictionary<string, User>();
        foreach (var user in users)
        {
            if (!teamEntities.TryGetValue(user.TeamId, out var team))
            {
                _logger.LogWarning("Team with id {TeamId} not found for user {UserId}", user.TeamId, user.Id);
                continue;
            }

            var entity = new User
            {
                Id = user.Id,
                Name = user.Name,
                Username = user.Username,
                Role = (Role)user.Role,
                Team = team
            };

            await session.SaveAsync(entity, cancellationToken);
            userEntities[user.Id] = entity;
        }

        foreach (var teamExercise in teamExercises)
        {
            if (!teamEntities.TryGetValue(teamExercise.TeamId, out var team))
            {
                _logger.LogWarning("Team with id {TeamId} not found for team exercise {TeamExerciseId}", teamExercise.TeamId, teamExercise.Id);
                continue;
            }

            if (!exerciseEntities.TryGetValue(teamExercise.TaskId, out var exercise))
            {
                _logger.LogWarning("Exercise with id {ExerciseId} not found for team exercise {TeamExerciseId}", teamExercise.TaskId, teamExercise.Id);
                continue;
            }

            var entity = new TeamExercise
            {
                Id = teamExercise.Id,
                Team = team,
                Exercise = exercise,
                SortOrder = teamExercise.Index
            };

            await session.SaveAsync(entity, cancellationToken);
        }

        foreach (var recruitExercise in recruitExercises)
        {
            if (!userEntities.TryGetValue(recruitExercise.RecruitId, out var recruit))
            {
                _logger.LogWarning("Recruit with id {RecruitId} not found for recruit exercise {RecruitExerciseId}", recruitExercise.RecruitId, recruitExercise.Id);
                continue;
            }

            if (!exerciseEntities.TryGetValue(recruitExercise.TaskId, out var exercise))
            {
                _logger.LogWarning("Exercise with id {ExerciseId} not found for recruit exercise {RecruitExerciseId}", recruitExercise.TaskId, recruitExercise.Id);
                continue;
            }

            var entity = new RecruitExercise
            {
                Id = recruitExercise.Id,
                Recruit = recruit,
                Exercise = exercise,
                Status = (ExerciseStatus)recruitExercise.Status,
                StartDate = recruitExercise.StartDate,
                CodeReviewDate = recruitExercise.CrDate,
                FixDate = recruitExercise.FixDate,
                DoneDate = recruitExercise.DoneDate
            };

            await session.SaveAsync(entity, cancellationToken);
        }

        foreach (var eventSeed in events)
        {
            if (!userEntities.TryGetValue(eventSeed.UserId, out var user))
            {
                _logger.LogWarning("User with id {UserId} not found for event {EventId}", eventSeed.UserId, eventSeed.Id);
                continue;
            }

            var entity = new Event
            {
                Id = eventSeed.Id,
                User = user,
                Type = (EventType)eventSeed.Type,
                Title = eventSeed.Title,
                Description = eventSeed.Description,
                Start = eventSeed.Start,
                End = eventSeed.End,
                AllDay = eventSeed.AllDay,
                CreatedAt = eventSeed.CreatedAt,
                UpdatedAt = eventSeed.UpdatedAt
            };

            await session.SaveAsync(entity, cancellationToken);
        }

        foreach (var recruitInstructor in recruitInstructors)
        {
            if (!userEntities.TryGetValue(recruitInstructor.RecruitId, out var recruit))
            {
                _logger.LogWarning("Recruit with id {RecruitId} not found for recruit instructor relation", recruitInstructor.RecruitId);
                continue;
            }

            if (!userEntities.TryGetValue(recruitInstructor.InstructorId, out var instructor))
            {
                _logger.LogWarning("Instructor with id {InstructorId} not found for recruit instructor relation", recruitInstructor.InstructorId);
                continue;
            }

            var entity = new RecruitInstructor
            {
                Recruit = recruit,
                Instructor = instructor
            };

            await session.SaveAsync(entity, cancellationToken);
        }

        await transaction.CommitAsync(cancellationToken);
        _logger.LogInformation("Database seeded successfully.");
    }

    private static async Task<T?> LoadAsync<T>(string directory, string fileName, JsonSerializerOptions options, CancellationToken cancellationToken)
    {
        var path = Path.Combine(directory, fileName);
        if (!File.Exists(path))
        {
            return default;
        }

        await using var stream = File.OpenRead(path);
        return await JsonSerializer.DeserializeAsync<T>(stream, options, cancellationToken);
    }

    private record TeamSeedModel(string Id, string Name);

    private record ExerciseSeedModel
    {
        public string Id { get; init; } = string.Empty;
        public string Title { get; init; } = string.Empty;
        public string ContentFile { get; init; } = string.Empty;
        public double WorkDays { get; init; }
        public bool Rtl { get; init; }
    }

    private record UserSeedModel
    {
        public string Id { get; init; } = string.Empty;
        public string Name { get; init; } = string.Empty;
        public string Username { get; init; } = string.Empty;
        public int Role { get; init; }
        public string TeamId { get; init; } = string.Empty;
    }

    private record TeamExerciseSeedModel
    {
        public string Id { get; init; } = string.Empty;
        public string TeamId { get; init; } = string.Empty;
        public string TaskId { get; init; } = string.Empty;
        public int Index { get; init; }
    }

    private record RecruitExerciseSeedModel
    {
        public string Id { get; init; } = string.Empty;
        public string RecruitId { get; init; } = string.Empty;
        public string TaskId { get; init; } = string.Empty;
        public int Status { get; init; }
        public DateTime StartDate { get; init; }
        public DateTime? CrDate { get; init; }
        public DateTime? FixDate { get; init; }
        public DateTime? DoneDate { get; init; }
    }

    private record EventSeedModel
    {
        public string Id { get; init; } = string.Empty;
        public string UserId { get; init; } = string.Empty;
        public int Type { get; init; }
        public string Title { get; init; } = string.Empty;
        public string? Description { get; init; }
        public DateTime Start { get; init; }
        public DateTime End { get; init; }
        public bool AllDay { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
    }

    private record RecruitInstructorSeedModel(string RecruitId, string InstructorId);
}
