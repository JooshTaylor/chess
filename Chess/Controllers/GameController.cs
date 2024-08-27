using Microsoft.AspNetCore.Mvc;

namespace Chess.Controllers;

[Route("api/game")]
public class GameController : Controller
{
    [HttpGet("")]
    public ActionResult GetGames()
    {
        return Ok(new[] { 1, 2, 3 });
    }
}