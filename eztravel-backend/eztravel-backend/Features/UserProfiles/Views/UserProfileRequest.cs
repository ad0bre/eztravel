namespace eztravel_backend.Features.UserProfiles.Views;

public class UserProfileRequest
{
    public string Name { get; set; }
    
    public string Phone { get; set; }
    
    public string UserId { get; set; }
    
    public ProfileType Type { get; set; }
}