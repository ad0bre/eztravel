using eztravel_backend.Base;
using eztravel_backend.Features.Accomodations;
using eztravel_backend.Features.Activities;
using eztravel_backend.Features.Transports;

namespace eztravel_backend.Features.Trips;

public class TripModel : ModelBase
{
    public string FormId {get; set; }
    
    public List<TransportSelection> Transports { get; set; }
    
    public List<AccomodationModel> Accomodations { get; set; }
    
    public List<ActivityModel> Activities { get; set; }
    
    public bool BudgetNotEnough { get; set; }
}