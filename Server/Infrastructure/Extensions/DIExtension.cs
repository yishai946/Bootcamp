using Microsoft.AspNetCore.Authorization;
using Server.Application.Services;
using Server.Infrastructure.Security;

namespace Server.Infrastructure.Extensions
{
    public static class DIExtension
    {
        public static IServiceCollection AddDI(this IServiceCollection services)
        {
            services.AddScoped<UserService>();
            services.AddScoped<RecruitExerciseService>();
            services.AddScoped<EventService>();
            services.AddScoped<ExerciseService>();

            return services;
        }
    }
}
