using eztravel_backend.Data;
using eztravel_backend.Features.Views;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features;

[ApiController]
[Route("api/transport")]
public class TransportController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public TransportController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost]
    public async Task<ActionResult<TransportView>> Add(TransportRequest request)
    {
        var transport = new TransportSelection
        {
            Name = request.Name,
            Description = request.Description,
            DepartureLocation = request.DepartureLocation,
            DepartureTime = request.DepartureTime,
            ArrivalLocation = request.ArrivalLocation,
            ArrivalTime = request.ArrivalTime,
            Price = request.Price,
            Capacity = request.Capacity,
            Type = request.Type
        };

        var result =await _dbContext.Transports.AddAsync(transport);
        await _dbContext.SaveChangesAsync();

        return Created($"transports/{result.Entity.Id}", new TransportView
        {
            Name = result.Entity.Name,
            Description = result.Entity.Description,
            DepartureLocation = result.Entity.DepartureLocation,
            DepartureTime = result.Entity.DepartureTime,
            ArrivalLocation = result.Entity.ArrivalLocation,
            ArrivalTime = result.Entity.ArrivalTime,
            Price = result.Entity.Price,
            Capacity = result.Entity.Capacity
        });
    }

    [HttpGet]
    public async Task<ActionResult<List<TransportView>>> Get()
    {
        return Ok(await _dbContext.Transports.Select(
            t => new TransportView
            {
                Name = t.Name,
                Description = t.Description,
                DepartureLocation = t.DepartureLocation,
                DepartureTime = t.DepartureTime,
                ArrivalLocation = t.ArrivalLocation,
                ArrivalTime = t.ArrivalTime,
                Price = t.Price,
                Capacity = t.Capacity
            })
            .ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TransportView>> Get([FromRoute] string id)
    {
        var transport = await _dbContext.Transports.FirstOrDefaultAsync(e => e.Id == id);

        if (transport is null)
        {
            return NotFound();
        }

        return Ok(new TransportView
        {
            Name = transport.Name,
            Description = transport.Description,
            DepartureLocation = transport.DepartureLocation,
            DepartureTime = transport.DepartureTime,
            ArrivalLocation = transport.ArrivalLocation,
            ArrivalTime = transport.ArrivalTime,
            Price = transport.Price,
            Capacity = transport.Capacity
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<TransportSelection>> Delete([FromRoute] string id)
    {
        var transport = await _dbContext.Transports.FirstOrDefaultAsync(e => e.Id == id);

        if (transport is null)
        {
            return NotFound();
        }

        var result = _dbContext.Transports.Remove(transport);

        return Ok(result.Entity);
    }
}