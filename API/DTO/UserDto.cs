using System.ComponentModel.DataAnnotations;

namespace API.DTO;


public class UserDto
{
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Token { get; set; } = null!;
}