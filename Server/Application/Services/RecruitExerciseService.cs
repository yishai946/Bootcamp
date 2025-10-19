using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.Infrastructure.Persistence;
using Server.Domain.Enums;
using Server.Domain.Entities;
using System.Diagnostics.CodeAnalysis;
using Server.Infrastructure.Security;

namespace Server.Application.Services
{
    public class RecruitExerciseService(Database database, HierarchyAuthorizationService authService)
    {
        private readonly Database Database = database;
        private readonly HierarchyAuthorizationService AuthService = authService;

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
                    .Select(recruitExercise => new RecruitExerciseDTO(recruitExercise))
                    .ToList();
            });
        }

        public RecruitExerciseDTO GetById(Guid recruitExerciseId, Guid currentUserId, string currentUserRole)
        {
            var recruitExercise = Database.Read(session => session.Query<RecruitExercise>()
                .Where(recruitExercise => recruitExercise.Id == recruitExerciseId)
                .Fetch(recruitExercise => recruitExercise.Exercise)
                .Fetch(recruitExercise => recruitExercise.Recruit)
                .SingleOrDefault());

            EnsureExerciseFound(recruitExercise);
            AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, recruitExercise.Recruit.Id);

            return new RecruitExerciseDTO(recruitExercise);
        }

        public void AdvanceStatus(Guid recruitExerciseId, Guid currentUserId, string currentUserRole)
        {
            Database.Modify(session =>
            {
                var recruitExercise = Database.Read(session => session.Query<RecruitExercise>()
                .Where(recruitExercise => recruitExercise.Id == recruitExerciseId)
                .Fetch(recruitExercise => recruitExercise.Exercise)
                .Fetch(recruitExercise => recruitExercise.Recruit)
                .SingleOrDefault());

                EnsureExerciseFound(recruitExercise);
                AuthService.EnsureSameUserOrSuperior(currentUserId, currentUserRole, recruitExercise.Recruit.Id);

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
    }
}
