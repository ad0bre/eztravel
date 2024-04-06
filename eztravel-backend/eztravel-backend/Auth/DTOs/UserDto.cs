namespace eztravel_backend.Auth.DTOs;

public class UserDto
{
    public string Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public IEnumerable<string> Errors { get; set; }
}