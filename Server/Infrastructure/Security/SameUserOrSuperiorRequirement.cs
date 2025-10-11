using Microsoft.AspNetCore.Authorization;

namespace Server.Infrastructure.Security
{
    public class SameUserOrSuperiorRequirement : IAuthorizationRequirement
    {
    }
}
