using System.ComponentModel.DataAnnotations;

namespace API.Entity;

public class Product
{
    [Key]
    public int Id { get; set; }
    [Required]
    public String? Name { get; set; }
    public String? Description { get; set; }
    public decimal Price { get; set; }
    public bool IsActive { get; set; }
    public string? ImageUrl { get; set; }
    public int Stock { get; set; }
}