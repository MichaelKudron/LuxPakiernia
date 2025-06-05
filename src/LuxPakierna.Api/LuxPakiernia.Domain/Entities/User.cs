using Microsoft.AspNetCore.Identity;

namespace LuxPakiernia.Domain.Entities;
public class User : IdentityUser<Guid>
{
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}


