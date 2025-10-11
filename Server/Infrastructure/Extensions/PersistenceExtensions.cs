using Server.Infrastructure.Persistence;

namespace Server.Infrastructure.Extensions
{
    public static class PersistenceExtensions
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration config)
        {
            var conn = config.GetConnectionString("Default")
                       ?? throw new InvalidOperationException("Missing connection string 'Default'.");
            services.AddSingleton(new Database(conn));

            return services;
        }
    }
}