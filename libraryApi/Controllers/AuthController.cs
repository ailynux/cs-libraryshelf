using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using libraryApi.Services; // Update this line
// Remove the Models import if it doesn't exist

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly BookContext _context;
    private readonly JwtService _jwtService;

    public AuthController(BookContext context, JwtService jwtService)
    {
        _context = context;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await _context.Users.AnyAsync(u => u.Username == registerDto.Username))
        {
            return BadRequest("Username is already taken");
        }

        using var hmac = new HMACSHA512();

        var user = new User
        {
            Username = registerDto.Username,
            PasswordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password))),
            Books = new List<Book>() // Initialize Books with an empty list
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto
        {
            Username = user.Username,
            Token = _jwtService.GenerateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == loginDto.Username);

        if (user == null)
        {
            return Unauthorized("Invalid username");
        }

        using var hmac = new HMACSHA512();
        var computedHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)));

        if (user.PasswordHash != computedHash)
        {
            return Unauthorized("Invalid password");
        }

        return new UserDto
        {
            Username = user.Username,
            Token = _jwtService.GenerateToken(user)
        };
    }
}

public class UserDto
{
    public required string Username { get; set; }
    public required string Token { get; set; }
}

public class RegisterDto
{
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Password { get; set; }
}

public class LoginDto
{
    [Required]
    public required string Username { get; set; }
    [Required]
    public required string Password { get; set; }
}