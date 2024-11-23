using Chess.Models.Entities;
using Chess.Models.Requests;

namespace Chess.Services.Interfaces;

public interface IGameService
{
    Task<IEnumerable<Game>> GetGamesAsync();
    Task<Game?> GetGameAsync(ulong id);
    Task<Game> CreateGameAsync(CreateGameRequest request);
    Task<Guid> AddPlayerAsync(ulong id);
    Task StartGameAsync(ulong id);
}