using System.ComponentModel.DataAnnotations;
using eztravel_backend.Base;

namespace eztravel_backend.Features.UserProfiles;

public class UserProfileModel : ModelBase
{
    public string Name { get; set; } = string.Empty;

    [EmailAddress] public string Email { get; set; } = string.Empty;

    [Phone] public string Phone { get; set; } = string.Empty;

    public bool IsVerified { get; set; } = false;

    public string UserId { get; set; } = string.Empty;

    public ProfileType Type { get; set; } = ProfileType.Traveller;
}