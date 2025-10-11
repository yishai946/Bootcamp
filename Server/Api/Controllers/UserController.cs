using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.Application.Services;
namespace Server.Api.Controllers
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
        [AllowAnonymous]
        public IActionResult Login([FromBody] LoginReqDTO loginData) => 
            Ok(UserService.Login(loginData));
    }
}
