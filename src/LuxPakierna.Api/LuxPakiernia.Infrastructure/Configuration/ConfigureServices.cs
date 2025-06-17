using LuxPakierna.Api.Services;
using LuxPakiernia.Application.Interfaces;
using LuxPakiernia.Domain.Entities;
using LuxPakiernia.Domain.Repositories;
using LuxPakiernia.Infrastructure.Persistance;
using LuxPakiernia.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace LuxPakiernia.Infrastructure.Configuration;
public static class ConfigureServices
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Konfiguracja SQLite
        services.AddDbContext<LuxPakierniaDbContext>(options =>
            options.UseSqlite(
                configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly(typeof(LuxPakierniaDbContext).Assembly.FullName)));

        services.AddScoped<ILuxPakierniaDbContext>(provider => provider.GetRequiredService<LuxPakierniaDbContext>());

        services.AddScoped<IExerciseRepository, ExerciseRepository>();
        services.AddScoped<IExerciseInPlanRepository, ExerciseInPlanRepository>();
        services.AddScoped<IPlanRepository, PlanRepository>();
        services.AddIdentity<User, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<LuxPakierniaDbContext>()
            .AddDefaultTokenProviders();

        services.Configure<IdentityOptions>(options =>
        {
            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 6;
            options.Password.RequireNonAlphanumeric = false;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;
        });

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(configuration["Jwt:Secret"])),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        services.AddScoped<ITokenService, TokenService>();
        services.AddHttpContextAccessor();
        services.AddScoped<ICurrentUserService, CurrentUserService>();

        return services;
    }
}