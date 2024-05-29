using eztravel_backend.Base;
using eztravel_backend.Features.Accomodations;
using eztravel_backend.Features.Activities;
using eztravel_backend.Features.Transports;

namespace eztravel_backend.Features.Trips;

public class TripModel : ModelBase
{
    public string Destination { get; set; }
    
    public DateTime ArrivalDate { get; set; }
    
    public DateTime DepartureDate { get; set; }
    
    public int NumberOfPeople { get; set; }
    
    public double Budget { get; set; }
    
    public List<TransportSelection> Transports { get; set; }
    
    public List<AccomodationModel> Accomodations { get; set; }
    
    public List<ActivityModel> Activities { get; set; }

    public bool BudgetNotEnough { get; set; } = false;
    
    public string UserId { get; set; }
}