using Chess.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chess.Data;

public class ChessDbContext : DbContext
{
    public DbSet<Game> Games { get; set; }

    public ChessDbContext(DbContextOptions<ChessDbContext> options) : base(options)
    {
        
    }
}