using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.Infrastructure.Persistence;
using Server.Domain.Enums;
using Server.Domain.Entities;
using System.Diagnostics.CodeAnalysis;

namespace Server.Application.Services
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

        public List<RecruitExerciseDTO> GetAll(Guid recruitId)
        {
            return Database.Read(session =>
            {
                var query =
                    from rcruitExercises in session.Query<RecruitExercise>()
                    where rcruitExercises.Recruit.Id == recruitId
                    from teamExercises in session.Query<TeamExercise>()
                        .Where(teamExercise => teamExercise.Team.Id == rcruitExercises.Recruit.Team.Id &&
                                     teamExercise.Exercise.Id == rcruitExercises.Exercise.Id)
                    orderby teamExercises.Position
                    select rcruitExercises;

                var recruitExercises = query
                    .Fetch(recruitExercise => recruitExercise.Exercise)
                    .ToList();

                return recruitExercises
                    .Select(recruitExercise => ConvertToDTO(recruitExercise, recruitId))
                    .ToList();
            });
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
                Exercise = ExerciseService.ConvertToDTO(recruitExercise.Exercise),
            };
    }
}
