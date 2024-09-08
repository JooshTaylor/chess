using Chess.Models.Requests;
using Chess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Chess.Controllers;

[Authorize, Route("api/games")]
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