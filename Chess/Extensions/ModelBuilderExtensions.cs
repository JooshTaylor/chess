using Chess.Enums;
using Chess.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Chess.Extensions;

public static class ModelBuilderExtensions
{
    public static void SeedTimeControls(this ModelBuilder modelBuilder)
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

    public static void SeedPieces(this ModelBuilder modelBuilder)
    {
        var pieces = new Piece[]
        {
            // White pieces
            new() { Type = PieceType.Rook, Colour = PieceColour.White, InitialX = 1, InitialY = 1 },
            new() { Type = PieceType.Knight, Colour = PieceColour.White, InitialX = 2, InitialY = 1 },
            new() { Type = PieceType.Bishop, Colour = PieceColour.White, InitialX = 3, InitialY = 1 },
            new() { Type = PieceType.Queen, Colour = PieceColour.White, InitialX = 4, InitialY = 1 },
            new() { Type = PieceType.King, Colour = PieceColour.White, InitialX = 5, InitialY = 1 },
            new() { Type = PieceType.Bishop, Colour = PieceColour.White, InitialX = 6, InitialY = 1 },
            new() { Type = PieceType.Knight, Colour = PieceColour.White, InitialX = 7, InitialY = 1 },
            new() { Type = PieceType.Rook, Colour = PieceColour.White, InitialX = 8, InitialY = 1 },
            
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 1, InitialY = 2 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 2, InitialY = 2 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 3, InitialY = 2 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 4, InitialY = 2 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 5, InitialY = 2 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 6, InitialY = 2 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 7, InitialY = 2 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.White, InitialX = 8, InitialY = 2 },
            
            // Black pieces
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 1, InitialY = 7 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 2, InitialY = 7 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 3, InitialY = 7 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 4, InitialY = 7 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 5, InitialY = 7 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 6, InitialY = 7 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 7, InitialY = 7 },
            new() { Type = PieceType.Pawn, Colour = PieceColour.Black, InitialX = 8, InitialY = 7 },

            new() { Type = PieceType.Rook, Colour = PieceColour.Black, InitialX = 1, InitialY = 8 },
            new() { Type = PieceType.Knight, Colour = PieceColour.Black, InitialX = 2, InitialY = 8 },
            new() { Type = PieceType.Bishop, Colour = PieceColour.Black, InitialX = 3, InitialY = 8 },
            new() { Type = PieceType.Queen, Colour = PieceColour.Black, InitialX = 4, InitialY = 8 },
            new() { Type = PieceType.King, Colour = PieceColour.Black, InitialX = 5, InitialY = 8 },
            new() { Type = PieceType.Bishop, Colour = PieceColour.Black, InitialX = 6, InitialY = 8 },
            new() { Type = PieceType.Knight, Colour = PieceColour.Black, InitialX = 7, InitialY = 8 },
            new() { Type = PieceType.Rook, Colour = PieceColour.Black, InitialX = 8, InitialY = 8 },
        };
        
        modelBuilder.Entity<Piece>().HasData(pieces);
    }
}