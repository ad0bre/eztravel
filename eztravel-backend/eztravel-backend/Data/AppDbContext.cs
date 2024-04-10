using eztravel_backend.Auth;
using eztravel_backend.Features;
using eztravel_backend.Features.Accomodations;
using eztravel_backend.Features.Activities;
using eztravel_backend.Features.Transports;
using eztravel_backend.Migrations;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace eztravel_backend.Data;

public class AppDbContext : IdentityDbContext<User, Role, string>
{
    public AppDbContext(DbContextOptions options) : base(options) {}
    
    public DbSet<TransportSelection> Transports { get; set; }
    
    public DbSet<AccomodationModel> Accomodations { get; set; }
    
    public DbSet<ActivityModel> Activities { get; set; }
}