using Server.Domain.Enums;
using Server.Entities;

namespace Server.DTOs
{
    public class LoginResDTO
    {
        public string AccessToken { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public Role Role { get; set; }
        public TeamDTO Team { get; set; } = default!;

    }
}
