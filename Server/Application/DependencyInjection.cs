using Microsoft.Extensions.DependencyInjection;
using Server.Application.Repositories;
using Server.Application.Services;
using Server.Infrastructure.Persistence.Repositories;

namespace Server.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IExerciseRepository, ExerciseRepository>();
        services.AddScoped<ITeamExerciseRepository, TeamExerciseRepository>();
        services.AddScoped<IRecruitExerciseRepository, RecruitExerciseRepository>();
        services.AddScoped<IEventRepository, EventRepository>();

        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IExerciseService, ExerciseService>();
        services.AddScoped<ITeamExerciseService, TeamExerciseService>();
        services.AddScoped<IRecruitExerciseService, RecruitExerciseService>();
        services.AddScoped<IEventService, EventService>();
        services.AddScoped<IProgressService, ProgressService>();

        return services;
    }
}
