using eztravel_backend.Data;
using eztravel_backend.Features.Accomodations.Views;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.Accomodations;

[ApiController]
[Route("api/accomodations")]
public class AccomodationsController : ControllerBase
{
    private readonly AppDbContext _dBContext;

    public AccomodationsController(AppDbContext dBContext)
    {
        _dBContext = dBContext;
    }

    [HttpPost]
    public async Task<ActionResult<AccomodationDto>> Add(AccomodationRequest request)
    {
        var accomodation = new AccomodationModel
        {
            Name = request.Name,
            Description = request.Description,
            CheckIn = request.CheckIn,
            CheckOut = request.CheckOut,
            Location = request.Location,
            People = request.People,
            Priority = request.Priority
        };

        var result = await _dBContext.Accomodations.AddAsync(accomodation);

        await _dBContext.SaveChangesAsync();

        return Created($"transports/{result.Entity.Id}", new AccomodationDto
        {
            Id = result.Entity.Id,
            Name = result.Entity.Name,
            Description = result.Entity.Description,
            CheckIn = result.Entity.CheckIn,
            CheckOut = result.Entity.CheckOut,
            Location = result.Entity.Location,
            People = result.Entity.People
        });
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AccomodationDto>>> Get()
    {
        return Ok(await _dBContext.Accomodations.Select(
            accomodation => new AccomodationDto
            {
                Id = accomodation.Id,
                Name = accomodation.Name,
                Description = accomodation.Description,
                CheckIn = accomodation.CheckIn,
                CheckOut = accomodation.CheckOut,
                Location = accomodation.Location,
                People = accomodation.People
            }).ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AccomodationDto>> Get([FromRoute] string id)
    {
        var accomodation = await _dBContext.Accomodations.FirstOrDefaultAsync(e => e.Id == id);

        if (accomodation is null)
        {
            return NotFound();
        }

        return Ok(new AccomodationDto
        {
            Id = accomodation.Id,
            Name = accomodation.Name,
            Description = accomodation.Description,
            CheckIn = accomodation.CheckIn,
            CheckOut = accomodation.CheckOut,
            Location = accomodation.Location,
            People = accomodation.People
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<AccomodationModel>> Delete([FromRoute] string id)
    {
        var accomodation = await _dBContext.Accomodations.FirstOrDefaultAsync(e => e.Id == id);

        if (accomodation is null)
        {
            return NotFound();
        }

        var result = _dBContext.Accomodations.Remove(accomodation);

        await _dBContext.SaveChangesAsync();

        return Ok(result.Entity);
    }
}