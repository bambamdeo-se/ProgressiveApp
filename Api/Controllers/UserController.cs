using Server.Model;
using FleetbaseIdentityCore.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Server.Controllers
{

    [ApiController]
    [EnableCors("_myAllowSpecificOrigins")]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;
        public UserController(SignInManager<ApplicationUser> signInManager,UserManager<ApplicationUser> userManager, IConfiguration config)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _config = config;
        }
      
        [HttpPost("loginuser")]
        public async Task<IActionResult> LoginUser(User user)
        {
            try
            {
                var result = await _signInManager.PasswordSignInAsync(user.EmailAddress, user.Password, true, lockoutOnFailure: false);
                if(result.Succeeded)
                {
                    var loggedinUser = await _userManager.FindByEmailAsync(user.EmailAddress);
                    var claims = new[]
                    {
                        new Claim("Id",loggedinUser.Id.ToString()),
                        new Claim("Name",loggedinUser.UserName),
                        new Claim("FirstName","Achal"),
                        new Claim("Email",loggedinUser.UserName)
                    };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var token = new JwtSecurityToken(
                            issuer: _config["Jwt:Issuer"],
                            audience: _config["Jwt:Audience"],
                            claims: claims,
                            expires: DateTime.Now.AddMinutes(30),
                            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature)
                            );
                    user.Token = tokenHandler.WriteToken(token);
                    user.EmailAddress = user.EmailAddress;
                    return Ok(user);
                }
                else
                {
                    user.Message = "Wrong UserId or password";
                    return Ok(user);
                }                 
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }


        [Route("api/ApiTest/Get")]
        [HttpGet]
        public string Get()
        {
            return "Authentication Api is up and running.";
        }
    }


}
