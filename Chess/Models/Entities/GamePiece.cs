using Chess.Enums;

namespace Chess.Models.Entities;

public class GamePiece
{
    public ulong Id { get; set; }
    public required Piece Piece { get; set; }
    public Game Game { get; set; }
    
    public int X { get; set; }
    public int Y { get; set; }
    public PieceType? PromotionType { get; set; } = null;
    public int TotalMoves { get; set; } = 0;
    public PieceStatus Status { get; set; } = PieceStatus.Alive;
}