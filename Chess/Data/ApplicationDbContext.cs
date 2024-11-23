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
            .UseSqlite($"Data Source={dbPath}")
            .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
    }
}