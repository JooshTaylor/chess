using Chess.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Chess.Data;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public DbSet<Game> Games { get; set; }
    public DbSet<TimeControl> TimeControls { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
}