using eztravel_backend.Data;
using eztravel_backend.Features.Transports.Views;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.Transports;

[ApiController]
[Route("api/transport")]
public class TransportController(AppDbContext dbContext) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<TransportView>> Add([FromBody]TransportRequest request)
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
            Type = request.Type,
            UserId = request.UserId
        };

        var result =await dbContext.Transports.AddAsync(transport);
        await dbContext.SaveChangesAsync();

        return Created($"transports/{result.Entity.Id}", new TransportView
        {
            Id = result.Entity.Id,
            Name = result.Entity.Name,
            Description = result.Entity.Description,
            DepartureLocation = result.Entity.DepartureLocation,
            DepartureTime = result.Entity.DepartureTime,
            ArrivalLocation = result.Entity.ArrivalLocation,
            ArrivalTime = result.Entity.ArrivalTime,
            Price = result.Entity.Price,
            Capacity = result.Entity.Capacity,
            UserId = result.Entity.UserId
        });
    }

    [HttpGet]
    public async Task<ActionResult<List<TransportView>>> Get()
    {
        return Ok(await dbContext.Transports.Select(
            t => new TransportView
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                DepartureLocation = t.DepartureLocation,
                DepartureTime = t.DepartureTime,
                ArrivalLocation = t.ArrivalLocation,
                ArrivalTime = t.ArrivalTime,
                Price = t.Price,
                Capacity = t.Capacity,
                UserId = t.UserId
            })
            .ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TransportView>> Get([FromRoute] string id)
    {
        var transport = await dbContext.Transports.FirstOrDefaultAsync(e => e.Id == id);

        if (transport is null)
        {
            return NotFound();
        }

        return Ok(new TransportView
        {
            Id = transport.Id,
            Name = transport.Name,
            Description = transport.Description,
            DepartureLocation = transport.DepartureLocation,
            DepartureTime = transport.DepartureTime,
            ArrivalLocation = transport.ArrivalLocation,
            ArrivalTime = transport.ArrivalTime,
            Price = transport.Price,
            Capacity = transport.Capacity,
            UserId = transport.UserId
        });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<TransportSelection>> Delete([FromRoute] string id)
    {
        var transport = await dbContext.Transports.FirstOrDefaultAsync(e => e.Id == id);

        if (transport is null)
        {
            return NotFound();
        }

        var result = dbContext.Transports.Remove(transport);

        await dbContext.SaveChangesAsync();

        return Ok(result.Entity);
    }
}