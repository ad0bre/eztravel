namespace eztravel_backend.Features.Accomodations.Views;

public class AccomodationRequest
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Location { get; set; }
    
    public DateTime CheckIn { get; set; }
    
    public DateTime CheckOut { get; set; }
    
    public int People { get; set; }
    
    public int Priority { get; set; }
    
    public string? ProfileId { get; set; }
}