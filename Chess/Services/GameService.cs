using Chess.Data;
using Chess.Enums;
using Chess.Models.Entities;
using Chess.Models.Requests;
using Chess.Services.Interfaces;

namespace Chess.Services;

public class GameService : IGameService
{
    private readonly ApplicationDbContext _context;

    public GameService(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Game> GetGames()
    {
        return _context.Games;
    }

    public async Task<Game> GetGameAsync(ulong id)
    {
        var game = await _context.Games.FindAsync(id);
        return game;
    }

    public async Task<Game> CreateGameAsync(CreateGameRequest request)
    {
        var timeControl = await _context.TimeControls.FindAsync(request.TimeControl.Time, request.TimeControl.Increment);

        if (timeControl == null)
        {
            throw new Exception($"Time control {request.TimeControl.Type} not found");
        }
        
        var newGame = new Game
        {
            TimeControl = timeControl,
            TimeRemainingBlack = request.TimeControl.Time,
            TimeRemainingWhite = request.TimeControl.Time
        };

        var game = await _context.Games.AddAsync(newGame);
        await _context.SaveChangesAsync();
        return game.Entity;
    }

    public async Task AddPlayerAsync(ulong id, Guid playerId)
    {
        var game = await GetGameAsync(id);
        
        if (game.PlayerOneId == null)
            game.PlayerOneId = playerId;
        else if (game.PlayerTwoId == null)
            game.PlayerTwoId = playerId;
        else
            throw new InvalidOperationException($"Player {playerId} already added");
        
        await _context.SaveChangesAsync();
    }

    public async Task StartGameAsync(ulong id)
    {
        var game = await GetGameAsync(id);

        game.Status = GameStatus.Running;
        
        await _context.SaveChangesAsync();
    }
}