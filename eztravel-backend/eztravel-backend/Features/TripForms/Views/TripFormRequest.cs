using System.ComponentModel.DataAnnotations;

namespace eztravel_backend.Features.TripForms.Views;

public class TripFormRequest
{
    [Required] public string UserId { get; set; }
    
    [Required] public string Destination { get; set; }

    [Required] public DateOnly ArrivalDay { get; set; }
    
    [Required] public DateOnly DepartureDay { get; set; }
    
    [Required] public int NumberOfPeople { get; set; }
    
    [Required] public decimal Budget { get; set; }
}