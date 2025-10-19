using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Server.Infrastructure.Security
{
    public class SameUserOrSuperiorPolicy : AuthorizationHandler<SameUserOrSuperiorRequirement>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly HierarchyAuthorizationService HierarchyAuth;

        public SameUserOrSuperiorPolicy(IHttpContextAccessor httpContextAccessor, HierarchyAuthorizationService hierarchyAuth)
        {
            _httpContextAccessor = httpContextAccessor;
            HierarchyAuth = hierarchyAuth;
        }

        protected override Task HandleRequirementAsync(
            AuthorizationHandlerContext context,
            SameUserOrSuperiorRequirement requirement)
        {
            var httpContext = _httpContextAccessor.HttpContext!;
            if (httpContext.Items.ContainsKey("SameUserOrSuperiorChecked"))
            {
                context.Succeed(requirement);
                return Task.CompletedTask;
            }

            var userIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var role = context.User.FindFirst(ClaimTypes.Role)?.Value;
            var routeIdStr = httpContext.Request.RouteValues["userId"]?.ToString();

            if (userIdClaim is null || routeIdStr is null)
            {
                return Task.CompletedTask;
            }

            HierarchyAuth.EnsureSameUserOrSuperior(Guid.Parse(userIdClaim), role!, Guid.Parse(routeIdStr));

            httpContext.Items["SameUserOrSuperiorChecked"] = true;
            context.Succeed(requirement);
            return Task.CompletedTask;
        }

    }
}
