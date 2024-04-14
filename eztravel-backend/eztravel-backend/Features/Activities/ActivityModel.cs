using eztravel_backend.Base;

namespace eztravel_backend.Features.Activities;

public class ActivityModel : ModelBase
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Type { get; set; }
    
    public string Address { get; set; }
    
    public int Priority { get; set; }
    
    public string? ProfileId { get; set; }
}