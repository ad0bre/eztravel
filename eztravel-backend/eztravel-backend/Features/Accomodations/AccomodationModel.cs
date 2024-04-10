using eztravel_backend.Base;

namespace eztravel_backend.Features.Accomodations;

public class AccomodationModel : ModelBase
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Location { get; set; }
    
    public DateTime CheckIn { get; set; }
    
    public DateTime CheckOut { get; set; }
    
    public int People { get; set; }
    
    public int Priority { get; set; }
}