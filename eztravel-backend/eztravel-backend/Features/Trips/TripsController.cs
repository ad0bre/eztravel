using eztravel_backend.Auth;
using eztravel_backend.Data;
using eztravel_backend.Features.Accomodations;
using eztravel_backend.Features.Accomodations.Views;
using eztravel_backend.Features.Activities;
using eztravel_backend.Features.Activities.View;
using eztravel_backend.Features.Transports;
using eztravel_backend.Features.Transports.Views;
using eztravel_backend.Features.Trips.Views;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Features.Trips;

[ApiController]
[Route("api/trips")]
public class TripsController : ControllerBase
{
    private static AppDbContext _dbContext;

    private readonly UserManager<User> _userManager;

    public TripsController(AppDbContext context, UserManager<User> userManager)
    {
        _dbContext = context;
        _userManager = userManager;
    }

    [HttpPost]
    public async Task<ActionResult<TripResponse>> Add([FromBody] TripRequest request)
    {
        var user = await _userManager.FindByIdAsync(request.UserId);

        if (user is null) return NotFound();

        var trip = new TripModel
        {
            Destination = request.Destination,
            ArrivalDate = request.ArrivalDate,
            DepartureDate = request.DepartureDate,
            NumberOfPeople = request.NumberOfPeople,
            Budget = request.Budget,
            UserId = user.Id,
            Transports = await GetTransports(request),
            Accomodations = await GetAccomodations(request),
            Activities = await GetActivities(request)
        };

        trip.BudgetNotEnough = !await VerifyBudget(trip.Budget, trip.Transports, trip.Accomodations, trip.Activities);

        if (trip.BudgetNotEnough) return BadRequest($"Budget {trip.Budget} is not enough!");

        var result = await _dbContext.Trips.AddAsync(trip);

        return Created($"trips/{trip.Id}", new TripResponse
        {
            Id = result.Entity.Id,
            Destination = result.Entity.Destination,
            ArrivalDay = DateOnly.FromDateTime(result.Entity.ArrivalDate),
            DepartureDay = DateOnly.FromDateTime(result.Entity.DepartureDate),
            NumberOfPeople = result.Entity.NumberOfPeople,
            Budget = result.Entity.Budget,
            Transports = result.Entity.Transports.Select(
                t => new TransportView
                {
                    Id = t.Id,
                    Name = t.Name,
                    ArrivalLocation = t.ArrivalLocation,
                    ArrivalTime = t.ArrivalTime,
                    Description = t.Description,
                    DepartureTime = t.DepartureTime,
                    DepartureLocation = t.DepartureLocation,
                    Capacity = t.Capacity,
                    Price = t.Price,
                    Type = t.Type,
                    ProfileId = t.ProfileId
                }).ToList(),
            Accomodations = result.Entity.Accomodations.Select(
                a => new AccomodationDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    CheckOut = a.CheckOut,
                    CheckIn = a.CheckIn,
                    Location = a.Location,
                    People = a.People,
                    Price = a.Price,
                    ProfileId = a.ProfileId
                }).ToList(),
            Activities = result.Entity.Activities.Select(
                a => new ActivityDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Address = a.Address,
                    ProfileId = a.ProfileId,
                    Type = a.Type,
                    Price = a.Price
                }).ToList(),
            BudgetNotEnough = result.Entity.BudgetNotEnough,
            UserId = result.Entity.UserId
        });
    }

    [HttpGet("{userid}")]
    public async Task<ActionResult<List<TripResponse>>> GetAllByUser([FromRoute] string userid)
    {
        var user = await _userManager.FindByIdAsync(userid);
        if (user is null) return NotFound(userid);

        return Ok(await _dbContext.Trips.Where(t => t.UserId == userid).Select(
            trip => new TripResponse
            {
                Id = trip.Id,
                Destination = trip.Destination,
                ArrivalDay = DateOnly.FromDateTime(trip.ArrivalDate),
                DepartureDay = DateOnly.FromDateTime(trip.DepartureDate),
                NumberOfPeople = trip.NumberOfPeople,
                Budget = trip.Budget,
                Transports = trip.Transports.Select(
                    t => new TransportView
                    {
                        Id = t.Id,
                        Name = t.Name,
                        ArrivalLocation = t.ArrivalLocation,
                        ArrivalTime = t.ArrivalTime,
                        Description = t.Description,
                        DepartureTime = t.DepartureTime,
                        DepartureLocation = t.DepartureLocation,
                        Capacity = t.Capacity,
                        Price = t.Price,
                        Type = t.Type,
                        ProfileId = t.ProfileId
                    }).ToList(),
                Accomodations = trip.Accomodations.Select(
                    a => new AccomodationDto
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        CheckOut = a.CheckOut,
                        CheckIn = a.CheckIn,
                        Location = a.Location,
                        People = a.People,
                        Price = a.Price,
                        ProfileId = a.ProfileId
                    }).ToList(),
                Activities = trip.Activities.Select(
                    a => new ActivityDto
                    {
                        Id = a.Id,
                        Name = a.Name,
                        Description = a.Description,
                        Address = a.Address,
                        ProfileId = a.ProfileId,
                        Type = a.Type,
                        Price = a.Price
                    }).ToList(),
                BudgetNotEnough = trip.BudgetNotEnough,
                UserId = trip.UserId
            }).ToListAsync());
    }

    [HttpGet("id/{id}")]
    public async Task<ActionResult<TripResponse>> GetById([FromRoute] string id)
    {
        var trip = await _dbContext.Trips
            .Include(tripModel => tripModel.Transports)
            .Include(tripModel => tripModel.Accomodations)
            .Include(tripModel => tripModel.Activities)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (trip is null) return NotFound();

        return Ok(new TripResponse
        {
            Id = trip.Id,
            Destination = trip.Destination,
            ArrivalDay = DateOnly.FromDateTime(trip.ArrivalDate),
            DepartureDay = DateOnly.FromDateTime(trip.DepartureDate),
            NumberOfPeople = trip.NumberOfPeople,
            Budget = trip.Budget,
            Transports = trip.Transports.Select(
                t => new TransportView
                {
                    Id = t.Id,
                    Name = t.Name,
                    ArrivalLocation = t.ArrivalLocation,
                    ArrivalTime = t.ArrivalTime,
                    Description = t.Description,
                    DepartureTime = t.DepartureTime,
                    DepartureLocation = t.DepartureLocation,
                    Capacity = t.Capacity,
                    Price = t.Price,
                    Type = t.Type,
                    ProfileId = t.ProfileId
                }).ToList(),
            Accomodations = trip.Accomodations.Select(
                a => new AccomodationDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    CheckOut = a.CheckOut,
                    CheckIn = a.CheckIn,
                    Location = a.Location,
                    People = a.People,
                    Price = a.Price,
                    ProfileId = a.ProfileId
                }).ToList(),
            Activities = trip.Activities.Select(
                a => new ActivityDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Address = a.Address,
                    ProfileId = a.ProfileId,
                    Type = a.Type,
                    Price = a.Price
                }).ToList(),
            BudgetNotEnough = trip.BudgetNotEnough,
            UserId = trip.UserId
        });
    }
    
    [HttpDelete("{id}")]
    public async Task<ActionResult<TripModel>> Delete([FromRoute] string id)
    {
        var trip = await _dbContext.Trips
            .Include(tripModel => tripModel.Transports)
            .Include(tripModel => tripModel.Accomodations)
            .Include(tripModel => tripModel.Activities)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (trip is null) return NotFound();

        var result = _dbContext.Trips.Remove(trip);

        await _dbContext.SaveChangesAsync();

        return Ok(trip);
    }

    private static async Task<List<TransportSelection>> GetTransports(TripRequest request)
    {
        return await _dbContext.Transports
            .Where(t => (t.DepartureLocation.Contains(request.CurrentLocation)
                         && t.ArrivalLocation.Contains(request.Destination)
                         && t.ArrivalTime.Date == request.ArrivalDate.Date
                         && t.Capacity >= request.NumberOfPeople)
                        || (t.DepartureLocation.Contains(request.Destination)
                            && t.ArrivalLocation.Contains(request.CurrentLocation)
                            && t.DepartureTime.Date == request.DepartureDate.Date
                            && t.Capacity >= request.NumberOfPeople))
            .ToListAsync();
    }

    private static async Task<List<AccomodationModel>> GetAccomodations(TripRequest request)
    {
        return await _dbContext.Accomodations
            .Where(a => a.Location.Contains(request.Destination)
                        && a.CheckIn.Date == request.ArrivalDate.Date
                        && a.CheckOut.Date == request.DepartureDate.Date
                        && a.People == request.NumberOfPeople)
            .ToListAsync();
    }

    private static async Task<List<ActivityModel>> GetActivities(TripRequest request)
    {
        return await _dbContext.Activities
            .Where(a => a.Address.Contains(request.Destination))
            .ToListAsync();
    }

    private static async Task<bool> VerifyBudget(double budget, List<TransportSelection> transports,
        List<AccomodationModel> accomodations, List<ActivityModel> activities)
    {
        return (from t in transports
            from ac in accomodations
            from at in activities
            where t.Price + ac.Price + at.Price <= budget
            select t).Any();
    }
}