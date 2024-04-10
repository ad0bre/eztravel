namespace eztravel_backend.Features.Accomodations.Views;

public class AccomodationDto
{
    public string Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Location { get; set; }
    
    public DateTime CheckIn { get; set; }
    
    public DateTime CheckOut { get; set; }
    
    public int People { get; set; }
}