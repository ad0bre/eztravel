using eztravel_backend.Auth;
using eztravel_backend.Data;
using eztravel_backend.Features.UserProfiles.Views;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.UserProfiles;

[ApiController]
[Route("api/user-profiles")]
public class UserProfileController(AppDbContext dbContext, UserManager<User> userManager) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<UserProfileDto>> Add([FromBody] UserProfileRequest request)
    {
        var user = await userManager.FindByIdAsync(request.UserId);

        if (user is null)
        {
            return NotFound();
        }
        
        var userProfile = new UserProfileModel
        {
            Name = request.Name,
            Email = user.Email,
            Phone = request.Phone ?? user.PhoneNumber,
            UserId = user.Id,
            Type = request.Type,
            IsVerified = false
        };

        var result = await dbContext.UserProfiles.AddAsync(userProfile);

        await dbContext.SaveChangesAsync();

        return Created($"user-profiles/{userProfile.Id}", new UserProfileDto
        {
            Id = result.Entity.Id,
            Name = result.Entity.Name,
            Email = result.Entity.Email,
            Phone = result.Entity.Phone,
            UserId = result.Entity.UserId,
            Type = result.Entity.Type,
            IsVerified = result.Entity.IsVerified
        });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserProfileDto>>> Get()
    {
        return Ok(await dbContext.UserProfiles.Select(
            userProfile => new UserProfileDto
            {
                Id = userProfile.Id,
                Name = userProfile.Name,
                Email = userProfile.Email,
                Phone = userProfile.Phone,
                UserId = userProfile.UserId,
                Type = userProfile.Type,
                IsVerified = userProfile.IsVerified
            }).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserProfileDto>> Get([FromRoute] string id)
    {
        var userProfile = await dbContext.UserProfiles.FirstOrDefaultAsync(e => e.Id == id);

        if (userProfile is null)
        {
            return NotFound();
        }

        return Ok(new UserProfileDto
        {
            Id = userProfile.Id,
            Name = userProfile.Name,
            Email = userProfile.Email,
            Phone = userProfile.Phone,
            UserId = userProfile.UserId,
            Type = userProfile.Type,
            IsVerified = userProfile.IsVerified
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<UserProfileModel>> Delete([FromRoute] string id)
    {
        var userProfile = await dbContext.UserProfiles.FirstOrDefaultAsync(e => e.Id == id);

        if (userProfile is null)
        {
            return NotFound();
        }

        var result = dbContext.UserProfiles.Remove(userProfile);

        await dbContext.SaveChangesAsync();

        return Ok(userProfile);
    }
}