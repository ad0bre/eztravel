namespace eztravel_backend.Features.Activities.View;

public class ActivityRequest
{
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public string Type { get; set; }
    
    public string Address { get; set; }
    
    public int Priority { get; set; }
    
    public string? ProfileId { get; set; }
    
    public double Price { get; set; }
}