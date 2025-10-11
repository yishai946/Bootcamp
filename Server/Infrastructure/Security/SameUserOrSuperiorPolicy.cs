using Microsoft.AspNetCore.Authorization;
using Server.Application.Services;
using System.Security.Claims;

namespace Server.Infrastructure.Security
{
    public class SameUserOrSuperiorPolicy : AuthorizationHandler<SameUserOrSuperiorRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserService UserService;

        public SameUserOrSuperiorPolicy(IHttpContextAccessor httpContextAccessor, UserService userService)
        {
            _httpContextAccessor = httpContextAccessor;
            UserService = userService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, SameUserOrSuperiorRequirement requirement)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = context.User.FindFirst(ClaimTypes.Role)?.Value;

            if (userIdClaim == null)
                return Task.CompletedTask;

            var routeIdStr = httpContext?.Request.RouteValues["id"]?.ToString();
            if (routeIdStr == null)
                return Task.CompletedTask;

            var targetId = Guid.Parse(routeIdStr);
            var userId = Guid.Parse(userIdClaim);

            if (targetId == userId)
            {
                context.Succeed(requirement);

                return Task.CompletedTask;
            }

            if (role == "Instructor" && UserService.IsRecruitOfInstructor(userId, targetId))
            {
                context.Succeed(requirement);

                return Task.CompletedTask;
            }

            if (role == "TeamLeader" && UserService.IsRecruitOfTeamLeader(userId, targetId))
            {
                context.Succeed(requirement);

                return Task.CompletedTask;
            }

            return Task.CompletedTask;
        }
    }
}
