using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Cfg;
using NHibernate;
using NHibernate.Driver;
using ISession = NHibernate.ISession;
using Server.Infrastructure.Persistence;

namespace Server.DB
{
    public class Database : IDisposable
    {
        private readonly ISessionFactory SessionFactory;

        public Database(string connection)
        {
            SessionFactory = Fluently.Configure()
                .Database(
                    PostgreSQLConfiguration.Standard
                        .ConnectionString(connection)
                        .Driver<NpgsqlDriver>()
                        .Dialect<NHibernate.Dialect.PostgreSQL82Dialect>()
                )
                .Mappings(map =>
                {
                    map.FluentMappings.AddFromAssemblyOf<Program>();
                })
                .ExposeConfiguration(cfg =>
                {
                    cfg.SetInterceptor(new MiniProfilerInterceptor());
                })
                .BuildSessionFactory();
        }

        public void Dispose() => SessionFactory?.Dispose();

        private ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }

        public T Read<T>(Func<ISession, T> func)
        {
            using (var session = OpenSession())
            {
                return func(session);
            }
        }
    }
}
