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
        var player = await _gameService.AddPlayerAsync(id);
        var game = await _gameService.GetGameAsync(id);

        await Clients.Caller.SendAsync("JoinGameSuccess", player.ToString());

        if (game.PlayerOneId != null && game.PlayerTwoId != null)
        {
            await _gameService.StartGameAsync(id);

            await Clients.All.SendAsync("StartGame", game);
        }
    }
}
