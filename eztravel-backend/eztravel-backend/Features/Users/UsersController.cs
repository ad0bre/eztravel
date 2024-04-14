using eztravel_backend.Auth;
using eztravel_backend.Auth.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.Users;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly UserManager<User> _userManager;

    public UsersController(UserManager<User> userManager)
    {
        _userManager = userManager;

        var user = new User();
    }

    [HttpGet]
    public async Task<ActionResult<UserDto>> Get()
    {
        return Ok(await _userManager.Users.Select(
            u => new UserDto
            {
                Id = u.Id,
                UserName = u.UserName ?? string.Empty,
                Email = u.Email ?? string.Empty,
                Errors = new List<string>()
            }).ToListAsync());
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<List<IdentityError>>> Delete([FromRoute] string id)
    {
        var user = await _userManager.FindByIdAsync(id);
        if (user is null)
        {
            return NotFound();
        }

        var result = await _userManager.DeleteAsync(user);
        return Ok(result.Errors);
    }
}