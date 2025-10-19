using Server.Application.Exceptions;
using Server.Application.Services;

namespace Server.Infrastructure.Security
{
    public class HierarchyAuthorizationService(UserService userService)
    {
        private readonly UserService UserService = userService;

        public bool IsSameUserOrSuperior(Guid currentUserId, string currentRole, Guid targetUserId)
        {
            if (currentUserId == targetUserId)
                return true;

            if (currentRole == "Instructor" && UserService.IsRecruitOfInstructor(currentUserId, targetUserId))
                return true;

            if (currentRole == "TeamLeader" && UserService.IsUserOfTeamLeader(currentUserId, targetUserId))
                return true;

            return false;
        }

        public void EnsureSameUserOrSuperior(Guid currentUserId, string currentRole, Guid targetUserId)
        {
            if (!IsSameUserOrSuperior(currentUserId, currentRole, targetUserId))
                throw new ForbiddenException();
        }
    }
}
