using Chess.Enums;
using Chess.Extensions;
using Chess.Migrations;
using Chess.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Chess.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Game> Games { get; set; }
    public DbSet<Move> Moves { get; set; }
    public DbSet<Piece> Pieces { get; set; }
    public DbSet<GamePiece> GamePieces { get; set; }
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
        modelBuilder.SeedTimeControls();
        modelBuilder.SeedPieces();
    }
}