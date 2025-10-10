using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.DB;
using Server.Domain.Enums;
using Server.Entities;
using System.Diagnostics.CodeAnalysis;

namespace Server.Services
{
    public class RecruitExerciseService
    {
        private readonly Database Database;
        private readonly ExerciseService ExerciseService;

        public RecruitExerciseService(Database database, ExerciseService exerciseService)
        {
            Database = database;
            ExerciseService = exerciseService;
        }

        public List<RecruitExerciseDTO> GetAll(Guid id)
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

        public void AdvanceStatus(Guid id)
        {
            Database.Modify(session =>
            {
                var exercise = session.Get<RecruitExercise>(id);

                EnsureExerciseFound(exercise);

                var values = Enum.GetValues(typeof(ExerciseStatus)).Cast<ExerciseStatus>().ToList();
                var currentIndex = values.IndexOf(exercise.Status);

                if (currentIndex == values.Count - 1)
                {
                    throw new AdvanceException();
                }
                
                exercise.Status = values[currentIndex + 1];

                session.SaveOrUpdate(exercise);
            });
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
                Status = recruitExercise.Status,
                FixDate = recruitExercise.FixDate,
                StartDate = recruitExercise.StartDate,
                RecruitId = recruitId,
                Exercise = ExerciseService.ConvertToDTO(recruitExercise.Exercise)
            };
    }
}
