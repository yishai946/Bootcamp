using System;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using Server.Infrastructure.Mappings;
using Server.Infrastructure.Seed;

namespace Server.Infrastructure.Persistence;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<DatabaseSettings>(configuration.GetSection(DatabaseSettings.SectionName));

        services.AddSingleton(provider =>
        {
            var options = provider.GetRequiredService<IOptions<DatabaseSettings>>().Value;
            if (string.IsNullOrWhiteSpace(options.ConnectionString))
            {
                throw new InvalidOperationException("Database connection string is not configured.");
            }

            var fluentConfiguration = Fluently.Configure()
                .Database(
                    PostgreSQLConfiguration.Standard
                        .ConnectionString(options.ConnectionString)
                        .DefaultSchema(options.Schema ?? "bootcamp")
                )
                .Mappings(m => m.FluentMappings.AddFromAssemblyOf<UserMap>())
                .ExposeConfiguration(cfg =>
                {
                    var update = new SchemaUpdate(cfg);
                    update.Execute(false, true);
                });

            return fluentConfiguration.BuildSessionFactory();
        });

        services.AddScoped(provider =>
        {
            var factory = provider.GetRequiredService<ISessionFactory>();
            return factory.OpenSession();
        });

        services.AddSingleton<Seed.DataSeeder>();
        services.AddHostedService<Seed.DataSeederHostedService>();

        return services;
    }
}
