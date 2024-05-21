namespace eztravel_backend.Features.Trips.Views;

public class TripRequest
{
    public string Destination { get; set; }
    
    public string CurrentLocation { get; set; }
    
    public DateTime ArrivalDate { get; set; }
    
    public DateTime DepartureDate { get; set; }
    
    public int NumberOfPeople { get; set; }
    
    public decimal Budget { get; set; }
    
    public string UserId { get; set; }
}