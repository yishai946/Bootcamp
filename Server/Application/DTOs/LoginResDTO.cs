namespace Server.Application.DTOs
{
    public class LoginResDTO
    {
        public string Token { get; set; } = string.Empty;
        public UserDTO User { get; set; } = default!;
    }
}
