namespace eztravel_backend.Auth.DTOs;

public class TokenDto
{
    public string Token { get; set; }
    public DateTime Expiration { get; set; }
}