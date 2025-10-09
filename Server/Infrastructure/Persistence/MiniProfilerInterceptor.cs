using NHibernate;
using NHibernate.SqlCommand;
using StackExchange.Profiling;

namespace Server.Infrastructure.Persistence
{
    public class MiniProfilerInterceptor : EmptyInterceptor
    {
        private static readonly AsyncLocal<int> _queryCounter = new();

        public override SqlString OnPrepareStatement(SqlString sql)
        {
            _queryCounter.Value++;

            int queryNumber = _queryCounter.Value;
            var profiler = MiniProfiler.Current;

            using (profiler?.Step($"SQL #{queryNumber}: {sql}"))
            {
                Console.WriteLine($"[NHibernate] SQL #{queryNumber}:\n{sql}\n");
            }

            return base.OnPrepareStatement(sql);
        }
    }
}
