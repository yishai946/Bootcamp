using Microsoft.IdentityModel.Tokens;
using Server.DB;
using Server.DTOs;
using Server.Entities;
using Server.Exceptions;
using Server.Infrastructure.Security;
using System.Diagnostics.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Server.Services
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
                .Where(u => u.Username == loginData.Username)
                .SingleOrDefault());

            EnsureUserFound(user);

            if (user.Password != loginData.Password)
            {
                throw new LoginException();
            }

            var accessToken = TokenService.GenerateAccessToken(user);

            return ConvertToLoginDto(accessToken, user);
        }

        public void EnsureUserFound([NotNull] User? user)
        {
            if (user == null)
            {
                throw new LoginException();
            }
        }

        private LoginResDTO ConvertToLoginDto(string token, User user) =>
            new()
            {
                AccessToken = token,
                Name = user.Name,
                Role = user.Role,
                Team = new TeamDTO { Id = user.Team.Id, Name = user.Team.Name },
                Username = user.Username
            };
    }
}
