namespace Chess.Models.Entities;

public class Move
{
    public ulong Id { get; init; }
    public required Game Game { get; set; }
    public required GamePiece Piece { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
}