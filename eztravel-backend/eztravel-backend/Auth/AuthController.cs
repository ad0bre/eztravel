using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using eztravel_backend.Auth.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace eztravel_backend.Auth;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly RoleManager<Role> _roleManager;
    private readonly UserManager<User> _userManager;

    public AuthController(UserManager<User> userManager, RoleManager<Role> roleManager,
        IConfiguration configuration)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _configuration = configuration;
    }

    [HttpPost]
    [Route("login")]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<TokenDto>> Login(LoginDto request)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user is null)
        {
            return NotFound();
        }
        var wrongPassword = !await _userManager.CheckPasswordAsync(user, request.Password);
        if (wrongPassword)
        {
            return Unauthorized();
        }

        var userRoles = await _userManager.GetRolesAsync(user);

        var authClaims = new List<Claim>
        {
            new("name", user.UserName),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        authClaims.AddRange(userRoles.Select(userRole => new Claim("roles", userRole)));

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

        var token = new JwtSecurityToken(
            _configuration["JWT:ValidIssuer"],
            _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(5),
            claims: authClaims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return Ok(new TokenDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = token.ValidTo
        });
    }

    [HttpPost]
    [Route("register")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<UserDto>> Register(RegisterDto request)
    {
        var rolesDoesNotExist = !await _roleManager.RoleExistsAsync("admin");
        var admins = await _userManager.GetUsersInRoleAsync("admin");

        if (rolesDoesNotExist || admins.Count == 0)
        {
            await AddRoles();
            return await AddUser(request, true);
        }

        var userWithSameName = await _userManager.FindByNameAsync(request.Username);
        var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
        var userExists = userWithSameEmail is not null || userWithSameName is not null;
        if (userExists)
        {
            return BadRequest("User already exists, please login");
        }

        return await AddUser(request, false);
    }

    private async Task AddRoles()
    {
        var role = new Role { Id = Guid.NewGuid().ToString(), Name = "admin" };
        var result = await _roleManager.CreateAsync(role);
        if (!result.Succeeded)
        {
            Console.WriteLine(result.Errors);
        }
    }

    private async Task<ActionResult<UserDto>> AddUser(RegisterDto model, bool makeAdmin)
    {
        var puser = new User { UserName = model.Username, Email = model.Email };

        var result = await _userManager.CreateAsync(puser, model.Password);
        if (!result.Succeeded)
        {
            var errors = result.Errors.Select(error => error.Description);
            return new UserDto { Errors = errors };
        }

        var user = await _userManager.FindByNameAsync(puser.UserName);
        if (makeAdmin)
        {
            await _userManager.AddToRoleAsync(user, "admin");
        }

        return Created("", new UserDto { Id = user.Id, Email = user.Email, UserName = user.UserName });
    }

}