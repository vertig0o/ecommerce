using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ErrorController : ControllerBase
{
    [HttpGet("not-found")]
    public IActionResult ErrorNotFound()
    {
        return NotFound();
    }
    [HttpGet("bad-request")]
    public IActionResult BadRequestError()
    {
        return BadRequest();
    }
    [HttpGet("unauthorized")]
    public IActionResult UnAuthorizedError()
    {
        return Unauthorized();
    }
    [HttpGet("validation-error")]
    public IActionResult ValidationError()
    {
        ModelState.AddModelError("validation error1", "validation error details");
        ModelState.AddModelError("validation error2", "validation error details");
        return ValidationProblem();
    }

    [HttpGet("server-error")]
    public IActionResult ServerError()
    {
        throw new Exception("server error");
    }


}