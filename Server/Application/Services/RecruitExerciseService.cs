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

        public List<RecruitExerciseDTO> GetAll(Guid userId)
        {
            return Database.Read(session =>
            {
                var query =
                    from rcruitExercises in session.Query<RecruitExercise>()
                    where rcruitExercises.Recruit.Id == userId
                    from teamExercises in session.Query<TeamExercise>()
                        .Where(teamExercise => teamExercise.Team.Id == rcruitExercises.Recruit.Team.Id &&
                                     teamExercise.Exercise.Id == rcruitExercises.Exercise.Id)
                    orderby teamExercises.Position
                    select rcruitExercises;

                var recruitExercises = query
                    .Fetch(recruitExercise => recruitExercise.Exercise)
                    .ToList();

                return recruitExercises
                    .Select(recruitExercise => ConvertToDTO(recruitExercise, userId))
                    .ToList();
            });
        }

        public RecruitExerciseDTO GetByExerciseId(Guid userId, Guid exerciseId)
        {
            var exercise = Database.Read(session => session.Query<RecruitExercise>()
                .Where(recruitExercise => recruitExercise.Recruit.Id == userId &&
                    recruitExercise.Exercise.Id == exerciseId)
                .Fetch(recruitExercise => recruitExercise.Exercise)
                .SingleOrDefault());

            EnsureExerciseFound(exercise);

            return ConvertToDTO(exercise, userId);
        }

        public void AdvanceStatus(Guid userId, Guid exerciseId)
        {
            Database.Modify(session =>
            {
                var recruitExercise = session.Query<RecruitExercise>()
                    .Where(recruitExercise => recruitExercise.Exercise.Id == exerciseId && recruitExercise.Recruit.Id == userId)
                    .SingleOrDefault();

                EnsureExerciseFound(recruitExercise);

                var values = Enum.GetValues(typeof(ExerciseStatus)).Cast<ExerciseStatus>().ToList();
                var currentIndex = values.IndexOf(recruitExercise.Status);

                if (currentIndex == values.Count - 1)
                {
                    throw new AdvanceException();
                }

                recruitExercise.Status = values[currentIndex + 1];

                session.SaveOrUpdate(recruitExercise);
            });
        }

        private void EnsureExerciseFound([NotNull] RecruitExercise? recruitExercise)
        {
            if (recruitExercise == null)
            {
                throw new NotFoundException("recruit exercise not found");
            }
        }

        private RecruitExerciseDTO ConvertToDTO(RecruitExercise recruitExercise, Guid userId) =>
            new()
            {
                Id = recruitExercise.Id,
                CrDate = recruitExercise.CrDate,
                DoneDate = recruitExercise.DoneDate,
                Status = recruitExercise.Status,
                FixDate = recruitExercise.FixDate,
                StartDate = recruitExercise.StartDate,
                RecruitId = userId,
                Exercise = ExerciseService.ConvertToDTO(recruitExercise.Exercise),
            };
    }
}
