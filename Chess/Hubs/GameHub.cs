using Chess.Enums;
using Chess.Services.Interfaces;

namespace Chess.Hubs;

using Microsoft.AspNetCore.SignalR;

public class GameHub(IGameService gameService) : Hub
{
    public override async Task OnConnectedAsync()
    {
        Console.WriteLine($"Client connected: {Context.ConnectionId}");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Console.WriteLine($"Client disconnected: {Context.ConnectionId}");
        if (exception != null)
        {
            Console.WriteLine($"Disconnection error: {exception.Message}");
        }
        await base.OnDisconnectedAsync(exception);
    }
    
    public async Task JoinGame(ulong id, Guid? playerId = null)
    {
        
        var game = await gameService.GetGameAsync(id);

        if (game == null)
        {
            throw new Exception("Game not found");
        }
        
        if (playerId.HasValue)
        {
            if (game.PlayerOneId != playerId && game.PlayerTwoId != playerId)
            {
                throw new Exception("Invalid player ID");
            }
            
            await Clients.Caller.SendAsync("JoinGameSuccess", id, playerId);
        }
        else
        {
            var player = await gameService.AddPlayerAsync(id);
            await Clients.Caller.SendAsync("JoinGameSuccess", game.Id, player.ToString());
        }

        if (game.Status == GameStatus.Pending && game.PlayerOneId != null && game.PlayerTwoId != null)
        {
            await gameService.StartGameAsync(id);
            await Clients.All.SendAsync("StartGame", game);
        }
    }
}