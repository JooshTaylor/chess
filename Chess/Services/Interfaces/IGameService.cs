using Chess.Models.Entities;
using Chess.Models.Requests;

namespace Chess.Services.Interfaces;

public interface IGameService
{
    Game GetGame(ulong id);
    Game CreateGame(CreateGameRequest request);
}