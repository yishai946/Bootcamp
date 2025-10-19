using Microsoft.AspNetCore.Authorization;
using Server.Application.Services;
using Server.Infrastructure.Security;

namespace Server.Infrastructure.Extensions
{
    public static class DIExtension
    {
        public static IServiceCollection AddDI(this IServiceCollection services)
        {
            services.AddScoped<TokenService>();
            services.AddScoped<UserService>();
            services.AddScoped<HierarchyAuthorizationService>();
            services.AddScoped<RecruitExerciseService>();
            services.AddScoped<EventService>();
            services.AddScoped<ExerciseService>();
            services.AddScoped<RecurringEventService>();
            services.AddScoped<RecurringEventExceptionService>();
            services.AddScoped<CalendarService>();
            services.AddSingleton<GlobalDaysOffService>();

            return services;
        }
    }
}
