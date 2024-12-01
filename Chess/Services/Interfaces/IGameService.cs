using Chess.Enums;
using Chess.Models.Entities;
using Chess.Models.Requests;

namespace Chess.Services.Interfaces;

public interface IGameService
{
    Task<IEnumerable<Game>> GetGamesAsync(GameStatus? status = null);
    Task<Game?> GetGameAsync(ulong id);
    Task<Game> CreateGameAsync(CreateGameRequest request);
    Task CreateMoveAsync(ulong id, CreateMoveRequest request);
    Task<Guid> AddPlayerAsync(ulong id);
    Task StartGameAsync(ulong id);
}