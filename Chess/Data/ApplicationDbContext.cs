using Chess.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chess.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Game> Games { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
}