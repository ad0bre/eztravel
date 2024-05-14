using eztravel_backend.Auth;
using eztravel_backend.Data;
using eztravel_backend.Features.TripForms.Views;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.TripForms;

[ApiController]
[Route("api/tripforms")]
public class TripFormsController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    private readonly UserManager<User> _userManager;

    public TripFormsController(AppDbContext context, UserManager<User> userManager)
    {
        _userManager = userManager;
        _dbContext = context;
    }

    [HttpPost]
    public async Task<ActionResult<TripFormDto>> Add([FromBody] TripFormRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.UserId);

        if (user is null)
        {
            return NotFound();
        }

        var trip = new TripFormModel
        {
            UserId = user.Id,
            Destination = request.Destination,
            ArrivalDay = request.ArrivalDay,
            DepartureDay = request.DepartureDay,
            NumberOfPeople = request.NumberOfPeople,
            Budget = request.Budget
        };

        var result = await _dbContext.TripForms.AddAsync(trip);
        await _dbContext.SaveChangesAsync();

        return Created($"tripforms/{result.Entity.Id}", new TripFormDto
        {
            Id = result.Entity.Id,
            Destination = result.Entity.Destination,
            UserId = result.Entity.UserId,
            ArrivalDay = result.Entity.ArrivalDay,
            DepartureDay = result.Entity.DepartureDay,
            NumberOfPeople = result.Entity.NumberOfPeople,
            Budget = result.Entity.Budget
        });
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<TripFormDto>> GetById([FromRoute] string id)
    {
        var trip = await _dbContext.TripForms.FirstOrDefaultAsync(e => e.Id == id);

        if (trip is null)
        {
            return NotFound();
        }

        return Ok(new TripFormDto
        {
            Id = trip.Id,
            UserId = trip.UserId,
            Destination = trip.Destination,
            ArrivalDay = trip.ArrivalDay,
            DepartureDay = trip.DepartureDay,
            NumberOfPeople = trip.NumberOfPeople,
            Budget = trip.Budget
        });
    }

    [HttpGet("userid/{userid}")]
    public async Task<ActionResult<List<TripFormDto>>> GetByUserId([FromRoute] string userid)
    {
        var user = await _userManager.FindByIdAsync(userid);

        if (user is null)
        {
            return NotFound();
        }

        return Ok(await _dbContext.TripForms
            .Where(t => t.UserId == userid)
            .Select(
            trip => new TripFormDto
            {
                Id = trip.Id,
                UserId = trip.UserId,
                Destination = trip.Destination,
                ArrivalDay = trip.ArrivalDay,
                DepartureDay = trip.DepartureDay,
                NumberOfPeople = trip.NumberOfPeople,
                Budget = trip.Budget
            })
            .ToListAsync()
        );
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<TripFormModel>> Delete([FromRoute] string id)
    {
        var trip = await _dbContext.TripForms.FirstOrDefaultAsync(e => e.Id == id);

        if (trip is null)
        {
            return NotFound();
        }

        var result = _dbContext.TripForms.Remove(trip);
        await _dbContext.SaveChangesAsync();

        return Ok(result.Entity);
    }
}