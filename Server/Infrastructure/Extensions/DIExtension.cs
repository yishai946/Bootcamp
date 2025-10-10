using Server.Services;

namespace Server.Infrastructure.Extensions
{
    public static class DIExtension
    {
        public static IServiceCollection AddDI(this IServiceCollection services)
        {
            services.AddScoped<UserService>();
            services.AddScoped<RecruitExerciseService>();

            return services;
        }
    }
}
