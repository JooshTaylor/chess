using Chess.Enums;

namespace Chess.Models.Entities;

public class Game
{
    public ulong Id { get; init; }
    public GameStatus Status { get; set; } = GameStatus.Pending;
    public GameEnding? Ending { get; init; } = null;
    public PieceColour? Winner { get; init; } = null;
    
    public ulong TimeRemainingWhite { get; init; }
    public ulong TimeRemainingBlack { get; init; }
    public required TimeControl TimeControl { get; init; }

    public Guid? PlayerOneId { get; set; } = null;
    public Guid? PlayerTwoId { get; set; } = null;
}