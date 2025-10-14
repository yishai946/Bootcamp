using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using Server.Infrastructure.Options;
using Server.Infrastructure.Security;
using System.Text;

namespace Server.Infrastructure.Extensions
{
    public static class AuthExtensions
    {
        public static IServiceCollection AddJwtAuth(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<JwtOptions>(config.GetSection("Jwt"));
            var jwt = config.GetSection("Jwt").Get<JwtOptions>()!;

            var keyBytes = Encoding.UTF8.GetBytes(jwt.Key);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = jwt.Issuer,

                        ValidateAudience = true,
                        ValidAudience = jwt.Audience,

                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),

                        ValidateLifetime = false,
                        RequireExpirationTime = false
                    };
                });

            services.AddHttpContextAccessor();
            services.AddScoped<IAuthorizationHandler, SameUserOrSuperiorPolicy>();

            services.AddAuthorization(options =>
            {
                options.FallbackPolicy = new AuthorizationPolicyBuilder()
                    .RequireAuthenticatedUser()
                    .AddRequirements(new SameUserOrSuperiorRequirement())
                    .Build();
            });

            services.AddScoped<TokenService>();

            return services;
        }
    }
}