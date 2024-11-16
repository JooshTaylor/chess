using Chess.Enums;
using Chess.Services.Interfaces;

namespace Chess.Hubs;

using Microsoft.AspNetCore.SignalR;

public class GameHub : Hub
{
    private readonly IGameService _gameService;
    
    public GameHub(IGameService gameService)
    {
        _gameService = gameService;
    }
    
    public async Task JoinGame(ulong id)
    {
        var game = _gameService.GetGame(id);

        if (game.Status != GameStatus.Pending)
            throw new Exception("Game has already started.");

        Guid playerId = Guid.NewGuid();

        // Until we have actual accounts, this is our poor mans way of adding players to a game.
        _gameService.AddPlayer(id, playerId);

        game = _gameService.GetGame(id);

        await Clients.Caller.SendAsync("JoinGameSuccess", playerId.ToString());

        if (game.PlayerOneId != null && game.PlayerTwoId != null)
        {
            _gameService.StartGame(id);

            await Clients.All.SendAsync("StartGame", game);
        }
    }
}
