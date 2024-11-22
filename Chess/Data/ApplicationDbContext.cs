using Chess.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chess.Data;

public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options)
{
    public DbSet<Game> Games { get; set; }
    public DbSet<TimeControl> TimeControls { get; set; }
}