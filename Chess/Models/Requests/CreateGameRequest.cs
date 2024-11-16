using Chess.Models.Entities;

namespace Chess.Models.Requests;

public class CreateGameRequest
{
    public TimeControl TimeControl { get; set; }
}