using Chess.Models.Requests;
using Chess.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Chess.Controllers;

[Route("api/game")]
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
        return Ok(new[] { 1, 2, 3 });
    }

    [HttpGet("{id}")]
    public ActionResult GetGame(ulong id)
    {
        return Ok(_gameService.GetGame(id));
    }

    [HttpPost("")]
    public ActionResult CreateGame([FromBody] CreateGameRequest request)
    {
        return Ok(_gameService.CreateGame(request));
    }
}