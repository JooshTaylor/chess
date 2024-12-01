using Chess.Enums;

namespace Chess.Models.Entities;

public class Game
{
    public ulong Id { get; init; }
    public GameStatus Status { get; set; } = GameStatus.Pending;
    public GameEnding? Ending { get; init; } = null;
    public PieceColour? Winner { get; init; } = null;
    public TimeControl TimeControl { get; init; }
    public IEnumerable<Move> Moves { get; set; } = new List<Move>();
    public IEnumerable<GamePiece> Pieces { get; set; } = new List<GamePiece>();
    public Guid? PlayerOneId { get; set; } = null;
    public Guid? PlayerTwoId { get; set; } = null;
}