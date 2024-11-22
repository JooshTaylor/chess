using Chess.Models.Requests;
using Chess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Chess.Controllers;

[Route("api/games")]
public class GameController : Controller
{
    private readonly IGameService _gameService;
    public GameController(IGameService gameService)
    {
        _gameService = gameService;
    }
    
    [HttpGet("")]
    public ActionResult GetGames()
    {
        return Ok(_gameService.GetGames());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGame(ulong id)
    {
        var game = await _gameService.GetGameAsync(id);
        return Ok();
    }

    [HttpPost("")]
    public async Task<IActionResult> CreateGame([FromBody] CreateGameRequest request)
    {
        var game = await _gameService.CreateGameAsync(request);
        return Ok(game);
    }
}