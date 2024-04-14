using eztravel_backend.Data;
using eztravel_backend.Features.Activities.View;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.Activities;

[ApiController]
[Route("api/activities")]
public class ActivitiesController(AppDbContext dbContext) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<ActivityDto>> Add([FromBody]ActivityRequest request)
    {
        var activity = new ActivityModel
        {
            Name = request.Name,
            Description = request.Description,
            Type = request.Type,
            Address = request.Address,
            Priority = request.Priority,
            ProfileId = request.ProfileId
        };

        var result = await dbContext.Activities.AddAsync(activity);

        await dbContext.SaveChangesAsync();

        return Created($"activities/{result.Entity.Id}", new ActivityDto
        {
            Id = result.Entity.Id,
            Name = result.Entity.Name,
            Description = result.Entity.Description,
            Type = result.Entity.Type,
            Address = result.Entity.Address,
            ProfileId = result.Entity.ProfileId
        });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityDto>>> Get()
    {
        return Ok(await dbContext.Activities.Select(
            activity => new ActivityDto
            {
                Id = activity.Id,
                Name = activity.Name,
                Description = activity.Description,
                Type = activity.Type,
                Address = activity.Address,
                ProfileId = activity.ProfileId
            }).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> Get([FromRoute] string id)
    {
        var activity = await dbContext.Activities.FirstOrDefaultAsync(e => e.Id == id);

        if (activity is null)
        {
            return NotFound();
        }

        return Ok(new ActivityDto
        {
            Id = activity.Id,
            Name = activity.Name,
            Description = activity.Description,
            Type = activity.Type,
            Address = activity.Address,
            ProfileId = activity.ProfileId
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ActivityModel>> Delete([FromRoute] string id)
    {
        var activity = await dbContext.Activities.FirstOrDefaultAsync(e => e.Id == id);

        if (activity is null)
        {
            return NotFound();
        }

        var result = dbContext.Activities.Remove(activity);

        await dbContext.SaveChangesAsync();

        return Ok(result.Entity);
    }
}