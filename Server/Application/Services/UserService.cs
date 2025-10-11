using NHibernate.Linq;
using Server.Application.DTOs;
using Server.Infrastructure.Persistence;
using Server.Domain.Entities;
using Server.Application.Exceptions;
using Server.Infrastructure.Security;
using System.Diagnostics.CodeAnalysis;
using Server.Domain.Enums;

namespace Server.Application.Services
{
    public class UserService
    {
        private readonly Database Database;
        private readonly TokenService TokenService;

        public UserService(Database database, TokenService tokenService)
        {
            Database = database;
            TokenService = tokenService;
        }

        public LoginResDTO Login(LoginReqDTO loginData)
        {
            var user = Database.Read(session => session.Query<User>()
                .Where(user => user.Username == loginData.Username)
                .Fetch(user => user.Team)
                .SingleOrDefault());

            EnsureUserFound(user);

            if (user.Password != loginData.Password)
            {
                throw new LoginException();
            }

            var accessToken = TokenService.GenerateAccessToken(user);

            return ConvertToLoginDto(accessToken, user);
        }

        public bool IsRecruitOfInstructor(Guid intructorId, Guid recruitId) =>
            Database.Read(session => session.Query<RecruitInstructor>()
                .Any(recruitInstructor => recruitInstructor.Instructor.Id == intructorId
                     && recruitInstructor.Recruit.Id == recruitId));

        public bool IsRecruitOfTeamLeader(Guid teamLeaderId, Guid recruitId) =>
            Database.Read(session =>
                session.Query<User>()
                    .Where(leader => leader.Id == teamLeaderId && leader.Role == Role.TeamLeader)
                    .Join(session.Query<User>().Where(r => r.Id == recruitId && r.Role == Role.Recruit),
                          leader => leader.Team.Id,
                          recruit => recruit.Team.Id,
                          (leader, recruit) => leader)
                    .Any()
            );

        private void EnsureUserFound([NotNull] User? user)
        {
            if (user == null)
            {
                throw new LoginException();
            }
        }

        private LoginResDTO ConvertToLoginDto(string token, User user) =>
            new()
            {
                Token = token,
                User = new()
                {
                    Id = user.Id,
                    Name = user.Name,
                    Role = user.Role,
                    Team = new() { Id = user.Team.Id, Name = user.Team.Name },
                    Username = user.Username
                }
            };
    }
}
