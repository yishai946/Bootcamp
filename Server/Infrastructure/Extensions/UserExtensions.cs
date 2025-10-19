using System.Security.Claims;

namespace Server.Infrastructure.Extensions
{
    public static class UserExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            var sub = user.FindFirst(ClaimTypes.NameIdentifier)?.Value
                      ?? user.FindFirst("sub")?.Value;

            if (sub == null)
                throw new UnauthorizedAccessException("Token missing user ID");

            return Guid.Parse(sub);
        }

        public static string GetUserRole(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.Role)?.Value
                   ?? throw new UnauthorizedAccessException("Token missing role");
        }
    }
}
