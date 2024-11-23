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
    
    public async Task JoinGame(ulong id)
    {
        var player = await gameService.AddPlayerAsync(id);
        var game = await gameService.GetGameAsync(id);

        await Clients.Caller.SendAsync("JoinGameSuccess", player.ToString());

        if (game.PlayerOneId != null && game.PlayerTwoId != null)
        {
            await gameService.StartGameAsync(id);

            await Clients.All.SendAsync("StartGame", game);
        }
    }
}