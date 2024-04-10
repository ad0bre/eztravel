namespace eztravel_backend.Features.Transports.Views;

public class TransportRequest
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string DepartureLocation { get; set; }
    public string ArrivalLocation { get; set; }
    public DateTime DepartureTime { get; set; }
    public DateTime ArrivalTime { get; set; }
    public double Price { get; set; }
    public string Type { get; set; }
    public int Capacity { get; set; }
    public string? UserId { get; set; }
    
    public int Priority { get; set; }
}