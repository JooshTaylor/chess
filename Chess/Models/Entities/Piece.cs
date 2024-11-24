using Chess.Enums;
using Microsoft.EntityFrameworkCore;

namespace Chess.Models.Entities;

[PrimaryKey("InitialX", "InitialY")]
public class Piece
{
    public PieceType Type { get; set; }
    public PieceColour Colour { get; set; }
    public int InitialX { get; set; }
    public int InitialY { get; set; }
}