using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.DTOs;
using Server.Exceptions;
using Server.Services;
namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService UserService;

        public UserController(UserService userService)
        {
            UserService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginReqDTO loginData)
        {
            try
            {
                return Ok(UserService.Login(loginData));
            }
            catch (LoginException exception)
            {
                return Unauthorized(exception.Message);
            }
        }
    }
}
