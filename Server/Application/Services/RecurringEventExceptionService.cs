using NHibernate.Linq;
using Server.Domain.Entities;
using Server.Infrastructure.Persistence;

namespace Server.Application.Services
{
    public class RecurringEventExceptionService
    {
        private readonly Database Database;

        public RecurringEventExceptionService(Database database)
        {
            Database = database;
        }

        public List<RecurringEventException> GetBySeries(Guid seriesId)
        {
            return Database.Read(session =>
                session.Query<RecurringEventException>()
                    .Where(e => e.Series.Id == seriesId)
                    .OrderBy(e => e.OccurrenceStart)
                    .ToList());
        }
    }
}
