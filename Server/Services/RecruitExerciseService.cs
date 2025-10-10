using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.DB;
using Server.Entities;
using Server.Exceptions;
using System.Diagnostics.CodeAnalysis;

namespace Server.Services
{
    public class RecruitExerciseService
    {
        private readonly Database Database;

        public RecruitExerciseService(Database database)
        {
            Database = database;
        }

        public IList<RecruitExerciseDTO> GetAll(Guid id)
        {
            var exrcises = Database.Read(session => session.Query<RecruitExercise>()
                .Where(recruitExercise => recruitExercise.Recruit.Id == id)
                .Fetch(recruitExercise => recruitExercise.Exercise)
                .ToList());

            return exrcises.Select(exercise => ConvertToDTO(exercise, id)).ToList();
        }

        public RecruitExerciseDTO GetByExerciseId(Guid recruitId, Guid exerciseId)
        {
            var exercise = Database.Read(session => session.Query<RecruitExercise>()
                .Where(recruitExercise => recruitExercise.Recruit.Id == recruitId &&
                    recruitExercise.Exercise.Id == exerciseId)
                .Fetch(recruitExercise => recruitExercise.Exercise)
                .SingleOrDefault());

            EnsureExerciseFound(exercise);

            return ConvertToDTO(exercise, recruitId);
        }


        private void EnsureExerciseFound([NotNull] RecruitExercise? recruitExercise)
        {
            if (recruitExercise == null)
            {
                throw new NotFoundException("recruit exercise not found");
            }
        }

        private RecruitExerciseDTO ConvertToDTO(RecruitExercise recruitExercise, Guid recruitId) =>
            new()
            {
                Id = recruitExercise.Id,
                CrDate = recruitExercise.CrDate,
                DoneDate = recruitExercise.DoneDate,
                Exercise = recruitExercise.Exercise,
                Status = recruitExercise.Status,
                FixDate = recruitExercise.FixDate,
                StartDate = recruitExercise.StartDate,
                RecruitId = recruitId
            };
    }
}
