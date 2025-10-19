using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.Domain.Entities;
using Server.Infrastructure.Persistence;

namespace Server.Application.Services
{
    public class RecurringEventService
    {
        private readonly Database Database;

        public RecurringEventService(Database database)
        {
            Database = database;
        }

        public List<RecurringEventSeries> GetUserSeries(Guid userId) =>
            Database.Read(session => session.Query<RecurringEventSeries>()
                    .Where(series => series.User.Id == userId)
                    .FetchMany(series => series.Exceptions)
                    .OrderBy(series => series.DtStart).ToList());

        //public void AddException(Guid seriesId, RecurringEventException exception)
        //{
        //    Database.Modify(session =>
        //    {
        //        var series = session.Get<RecurringEventSeries>(seriesId);

        //        if (series == null)
        //        {
        //            throw new NotFoundException("Series not found");
        //        }

        //        exception.Series = series;
        //        series.Exceptions.Add(exception);
        //        session.SaveOrUpdate(series);
        //    });
        //}

        //public void RemoveException(Guid exceptionId)
        //{
        //    Database.Modify(session =>
        //    {
        //        var exception = session.Get<RecurringEventException>(exceptionId);
        //        if (exception != null)
        //            session.Delete(exception);
        //    });
        //}
    }
}
