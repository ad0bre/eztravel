using eztravel_backend.Data;
using eztravel_backend.Features.Activities.View;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.Activities;

[ApiController]
[Route("api/activities")]
public class ActivitiesController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public ActivitiesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

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
            UserId = request.UserId
        };

        var result = await _dbContext.Activities.AddAsync(activity);

        await _dbContext.SaveChangesAsync();

        return Created($"activities/{result.Entity.Id}", new ActivityDto
        {
            Id = result.Entity.Id,
            Name = result.Entity.Name,
            Description = result.Entity.Description,
            Type = result.Entity.Type,
            Address = result.Entity.Address,
            UserId = result.Entity.UserId
        });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ActivityDto>>> Get()
    {
        return Ok(await _dbContext.Activities.Select(
            activity => new ActivityDto
            {
                Id = activity.Id,
                Name = activity.Name,
                Description = activity.Description,
                Type = activity.Type,
                Address = activity.Address,
                UserId = activity.UserId
            }).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> Get([FromRoute] string id)
    {
        var activity = await _dbContext.Activities.FirstOrDefaultAsync(e => e.Id == id);

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
            UserId = activity.UserId
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ActivityModel>> Delete([FromRoute] string id)
    {
        var activity = await _dbContext.Activities.FirstOrDefaultAsync(e => e.Id == id);

        if (activity is null)
        {
            return NotFound();
        }

        var result = _dbContext.Activities.Remove(activity);

        await _dbContext.SaveChangesAsync();

        return Ok(result.Entity);
    }
}