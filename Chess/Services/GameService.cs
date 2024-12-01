using Chess.Data;
using Chess.Enums;
using Chess.Models.Entities;
using Chess.Models.Requests;
using Chess.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Chess.Services;

public class GameService(ApplicationDbContext context) : IGameService
{
    public async Task<IEnumerable<Game>> GetGamesAsync(GameStatus? status = null)
    {
        if (status == null)
            return await context.Games.ToListAsync();
        
        return await context.Games.Where(g => g.Status == status).ToListAsync();
    }

    public async Task<Game?> GetGameAsync(ulong id)
    {
        var game = await context.Games
            .Include(g => g.Pieces)
            .ThenInclude(p => p.Piece)
            .Include(g => g.Moves)
            .FirstOrDefaultAsync(g => g.Id == id);

        return game;
    }

    public async Task<Game> CreateGameAsync(CreateGameRequest request)
    {
        var timeControl = await context.TimeControls.FindAsync(request.TimeControl.Time, request.TimeControl.Increment);

        if (timeControl == null)
        {
            throw new InvalidOperationException(
                $"Time control with Time={request.TimeControl.Time} and Increment={request.TimeControl.Increment} not found. " +
                "Please use an existing time control configuration.");
        }
    
        var newGame = new Game
        {
            TimeControl = timeControl,
            Pieces = await GetInitialGamePieces()
        };

        await context.Games.AddAsync(newGame);
        await context.SaveChangesAsync();
        return newGame;
    }

    public async Task<Guid> AddPlayerAsync(ulong id)
    {
        var game = await GetGameAsync(id);
        
        if (game == null)
        {
            throw new Exception($"Game {id} not found");
        }

        if (game.Status != GameStatus.Pending)
        {
            // TODO: Spectator support
            throw new Exception($"Game {id} has already started.");
        }
        
        Guid playerId = Guid.NewGuid();
        
        // TODO: I don't think this actually works. Watch updating part of course.
        if (game.PlayerOneId == null)
            game.PlayerOneId = playerId;
        else if (game.PlayerTwoId == null)
            game.PlayerTwoId = playerId;
        else
            throw new InvalidOperationException($"Player {playerId} already added");
        
        await context.SaveChangesAsync();

        return playerId;
    }

    public async Task StartGameAsync(ulong id)
    {
        var game = await GetGameAsync(id);

        if (game == null)
        {
            throw new Exception($"Game {id} not found");
        }

        game.Status = GameStatus.Running;
        
        await context.SaveChangesAsync();
    }

    public async Task CreateMoveAsync(ulong id, CreateMoveRequest request)
    {
        var game = await GetGameAsync(id);

        if (game == null)
        {
            throw new Exception($"Game {id} not found");
        }

        if (game.Status != GameStatus.Running)
        {
            throw new Exception($"Game {id} is not running");
        }

        var piece = await context.GamePieces.FindAsync(request.PieceId);

        if (piece == null)
        {
            throw new Exception($"Piece {request.PieceId} not found");
        }
        
        var move = new Move
        {
            Game = game,
            Piece = piece,
            X = request.X,
            Y = request.Y,
        };

        await context.Moves.AddAsync(move);
        await context.SaveChangesAsync();
    }

    private async Task<List<GamePiece>> GetInitialGamePieces()
    {
        var pieces = await context.Pieces.ToListAsync();

        var gamePieces = pieces.Select(p => new GamePiece
        {
            Piece = p,
            X = p.InitialX,
            Y = p.InitialY
        });

        return gamePieces.ToList();
    }
}