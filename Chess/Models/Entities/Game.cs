using Chess.Enums;

namespace Chess.Models.Entities;

public class Game
{
    public ulong Id { get; init; }
    public GameStatus Status { get; set; } = GameStatus.Pending;
    public GameEnding? Ending { get; set; } = null;
    public PieceColour? Winner { get; set; } = null;
    
    public ulong TimeRemainingWhite { get; set; }
    public ulong TimeRemainingBlack { get; set; }
    public TimeControl TimeControl { get; set; }

    public Guid? PlayerOneId { get; set; } = null;
    public Guid? PlayerTwoId { get; set; } = null;
}