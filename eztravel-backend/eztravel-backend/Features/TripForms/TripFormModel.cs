using eztravel_backend.Base;

namespace eztravel_backend.Features.TripForms;

public class TripFormModel : ModelBase
{
    public string UserId { get; set; } 

    public string Destination { get; set; } 
    
    public DateOnly ArrivalDay { get; set; }
    
    public DateOnly DepartureDay { get; set; }
    
    public int NumberOfPeople { get; set; }
    
    public decimal Budget { get; set; }
}