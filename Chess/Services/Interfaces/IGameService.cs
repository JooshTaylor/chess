using Chess.Models.Entities;
using Chess.Models.Requests;

namespace Chess.Services.Interfaces;

public interface IGameService
{
    IEnumerable<Game> GetGames();
    Task<Game> GetGameAsync(ulong id);
    Task<Game> CreateGameAsync(CreateGameRequest request);
    Task AddPlayerAsync(ulong id, Guid playerId);
    Task StartGameAsync(ulong id);
}