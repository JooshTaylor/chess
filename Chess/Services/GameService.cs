using Chess.Data;
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
            .Where(g => g.Id == id)
            .FirstOrDefault();

        return game;
    }

    public Game CreateGame(CreateGameRequest request)
    {
        var newGame = new Game {};
        var game = _context.Games.Add(newGame);
        _context.SaveChanges();
        return game.Entity;
    }
}