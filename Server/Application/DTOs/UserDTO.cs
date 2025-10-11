using Server.Domain.Enums;

namespace Server.Application.DTOs
{
    public class UserDTO
    {
        public Guid Id { get; set; } = default!;
        public string Name { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public Role Role { get; set; }
        public TeamDTO Team { get; set; } = default!;
    }
}
