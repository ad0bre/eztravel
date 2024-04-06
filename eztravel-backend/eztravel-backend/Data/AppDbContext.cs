using eztravel_backend.Auth;
using eztravel_backend.Features;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Data;

public class AppDbContext : IdentityDbContext<User, Role, string>
{
    public AppDbContext(DbContextOptions options) : base(options) {}
    
    public DbSet<TransportSelection> Transports { get; set; }
}