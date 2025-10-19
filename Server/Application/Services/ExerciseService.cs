using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.Infrastructure.Persistence;
using Server.Domain.Entities;

namespace Server.Application.Services
{
    public class ExerciseService
    {
        private readonly Database Database;

        public ExerciseService(Database database)
        {
            Database = database;
        }
    }
}
