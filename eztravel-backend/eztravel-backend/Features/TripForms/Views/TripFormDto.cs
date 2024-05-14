namespace eztravel_backend.Features.TripForms.Views;

public class TripFormDto
{
    public string Id { get; set; } 
    
    public string UserId { get; set; } 

    public string Destination { get; set; } 
    
    public DateOnly ArrivalDay { get; set; }
    
    public DateOnly DepartureDay { get; set; }
    
    public int NumberOfPeople { get; set; }
    
    public decimal Budget { get; set; }
}