namespace eztravel_backend.Features.UserProfiles.Views;

public class UserProfileDto
{
    public string Id { get; set; }
    
    public string Name { get; set; }
    
    public string Email { get; set; }

    public string Phone { get; set; }
    
    public string UserId { get; set; } 
    
    public bool IsVerified { get; set; }
    
    public ProfileType Type { get; set; }
}