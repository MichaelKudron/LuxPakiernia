using LuxPakiernia.Domain.Entities;

namespace LuxPakiernia.Application.Interfaces;
public interface ITokenService
{
    string GenerateToken(User user);
    Guid? ValidateToken(string token);
}
