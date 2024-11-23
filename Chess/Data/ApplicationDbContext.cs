using Chess.Enums;
using Chess.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chess.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Game> Games { get; set; }
    public DbSet<TimeControl> TimeControls { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var folder = Environment.SpecialFolder.MyDocuments;
        var path = Environment.GetFolderPath(folder);
        var dbPath = Path.Join(path, "chess.db");

        optionsBuilder
            .UseSqlite($"Data Source={dbPath}");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var timeControls = new TimeControl[]
        {
            // Bullet time controls
            new() { Type = TimeControlType.Bullet, Time = 100000, Increment = 0 },
            new() { Type = TimeControlType.Bullet, Time = 100000, Increment = 1000 },
            new() { Type = TimeControlType.Bullet, Time = 200000, Increment = 1000 },

            // Blitz time controls
            new() { Type = TimeControlType.Blitz, Time = 180000, Increment = 0 },
            new() { Type = TimeControlType.Blitz, Time = 180000, Increment = 2000 },
            new() { Type = TimeControlType.Blitz, Time = 300000, Increment = 0 },
            
            // Rapid time controls
            new() { Type = TimeControlType.Rapid, Time = 600000, Increment = 0 },
            new() { Type = TimeControlType.Rapid, Time = 900000, Increment = 10000 },
            new() { Type = TimeControlType.Rapid, Time = 1800000, Increment = 0 }
        };

        modelBuilder.Entity<TimeControl>().HasData(timeControls);
    }
}