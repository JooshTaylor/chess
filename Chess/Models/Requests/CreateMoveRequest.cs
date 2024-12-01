namespace Chess.Models.Requests;

public class CreateMoveRequest
{
    public ulong PieceId { get; set; }
    
    public int X { get; set; }
    public int Y { get; set; }
}