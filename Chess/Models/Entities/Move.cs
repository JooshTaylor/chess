namespace Chess.Models.Entities;

public class Move
{
    public ulong Id { get; init; }
    public Game Game { get; set; }
    public GamePiece Piece { get; set; }
    public int X { get; set; }
    public int Y { get; set; }
}