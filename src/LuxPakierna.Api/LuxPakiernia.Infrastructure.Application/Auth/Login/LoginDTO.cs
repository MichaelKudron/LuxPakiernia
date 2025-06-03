namespace LuxPakiernia.Application.Auth.Login;
public class LoginDTO
{
    public string Token { get; set; }
    public Guid UserId { get; set; }
    public string Login { get; set; }
}