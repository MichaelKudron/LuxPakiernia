using LuxPakiernia.Application.Auth.Register;
using Microsoft.Extensions.DependencyInjection;

namespace LuxPakiernia.Application.Services;
public static class ConfigureServices
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMediatR(cfg =>
                cfg.RegisterServicesFromAssembly(typeof(RegisterCommand).Assembly));

        return services;
    }
}
