using eztravel_backend.Auth;
using eztravel_backend.Data;
using eztravel_backend.Features.Accomodations;
using eztravel_backend.Features.Activities;
using eztravel_backend.Features.Transports;
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

        if (user is null)
        {
            return NotFound();
        }
        
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
            Activities = await GetActivities(request),
            BudgetNotEnough = false
        };
        
        

        return Created($"trips/{trip.Id}", new TripResponse());
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

    // private static bool IsValidTransportToLocation(TransportSelection t, TripRequest request)
    // {
    //     return t.DepartureLocation.Contains(request.CurrentLocation)
    //            && t.ArrivalLocation.Contains(request.Destination)
    //            && t.ArrivalTime.Date == request.ArrivalDate.Date
    //            && t.Capacity >= request.NumberOfPeople;
    // }
    //
    // private static bool IsValidTransportFromLocation(TransportSelection t, TripRequest request)
    // {
    //     return t.DepartureLocation.Contains(request.Destination)
    //            && t.ArrivalLocation.Contains(request.CurrentLocation)
    //            && t.DepartureTime.Date == request.DepartureDate.Date
    //            && t.Capacity >= request.NumberOfPeople;
    // }
}