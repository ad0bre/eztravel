using eztravel_backend.Features.Accomodations.Views;
using eztravel_backend.Features.Activities.View;
using eztravel_backend.Features.Transports.Views;

namespace eztravel_backend.Features.Trips.Views;

public class TripResponse
{
    public string Id { get; set; }
    
    public string Destination { get; set; }
    
    public DateOnly ArrivalDay { get; set; }
    
    public DateOnly DepartureDay { get; set; }
    
    public int NumberOfPeople { get; set; }
    
    public double Budget { get; set; }
    
    public List<TransportView> Transports { get; set; }
    
    public List<AccomodationDto> Accomodations { get; set; }
    
    public List<ActivityDto> Activities { get; set; }

    public bool BudgetNotEnough { get; set; } = false;
    
    public string UserId { get; set; }
}