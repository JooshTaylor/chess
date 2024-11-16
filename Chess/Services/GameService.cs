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
        var games = _context.Games;
        return games;
    }

    public Game GetGame(ulong id)
    {
        var game = _context.Games
            .FirstOrDefault(g => g.Id == id);

        return game;
    }

    public Game CreateGame(CreateGameRequest request)
    {
        var newGame = new Game()
        {
            TimeControl = request.TimeControl,
            TimeRemainingBlack = request.TimeControl.Time,
            TimeRemainingWhite = request.TimeControl.Time
        };

        var game = _context.Games.Add(newGame);
        _context.SaveChanges();
        return game.Entity;
    }

    public void AddPlayer(ulong id, Guid playerId)
    {
        var game = GetGame(id);
        
        if (game.PlayerOneId == null)
            game.PlayerOneId = playerId;
        else if (game.PlayerTwoId == null)
            game.PlayerTwoId = playerId;
        else
            throw new InvalidOperationException($"Player {playerId} already added");
        
        _context.SaveChanges();
    }

    public void StartGame(ulong id)
    {
        var game = GetGame(id);

        game.Status = GameStatus.Running;
        
        _context.SaveChanges();
    }
}