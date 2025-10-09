using System.ComponentModel.DataAnnotations;

namespace Server.DTOs
{
    public class LoginReqDTO
    {
        [Required, StringLength(100, MinimumLength = 1)]
        public string Username { get; set; }

        [Required, StringLength(100, MinimumLength = 1)]
        public string Password { get; set; }
    }
}
