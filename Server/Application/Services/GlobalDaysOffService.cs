using Server.Domain.Entities;
using Server.Infrastructure.Persistence;

namespace Server.Application.Services
{
    public class GlobalDaysOffService
    {
        private readonly Database Database;
        public List<GlobalDayOff>? GlobalDayOffs;

        public GlobalDaysOffService(Database database)
        {
            Database = database;
        }

        public List<GlobalDayOff> GetAll()
        {
            if (GlobalDayOffs == null)
            {
                return Database.Read(session => session.Query<GlobalDayOff>().ToList());
            }
            else
            {
                return GlobalDayOffs;
            }
        }
    }
}
