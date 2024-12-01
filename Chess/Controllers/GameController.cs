using Chess.Enums;
using Chess.Models.Requests;
using Chess.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Chess.Controllers;

[Route("api/v1/games")]
public class GameController(IGameService gameService) : Controller
{
    [HttpGet("")]
    public async Task<IActionResult> GetGames([FromQuery] GameStatus? status = null)
    {
        var games = await gameService.GetGamesAsync(status);
        return Ok(games);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGame(ulong id)
    {
        var game = await gameService.GetGameAsync(id);
        return Ok(game);
    }

    [HttpPost("")]
    public async Task<IActionResult> CreateGame([FromBody] CreateGameRequest request)
    {
        var game = await gameService.CreateGameAsync(request);
        return Ok(game);
    }

    [HttpPost("{id}/moves")]
    public async Task<IActionResult> CreateMove(ulong id, [FromBody] CreateMoveRequest request)
    {
        await gameService.CreateMoveAsync(id, request);
        return Ok();
    }
}