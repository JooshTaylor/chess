using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Chess.Controllers;

[Route("api/accounts")]
public class AccountController : Controller
{
    private readonly SignInManager<IdentityUser> _signInManager;
    
    public AccountController(SignInManager<IdentityUser> signInManager)
    {
        _signInManager = signInManager;
    }
    
    [HttpPost("logout"), Authorize]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync().ConfigureAwait(false);
        return Ok();
    }
}