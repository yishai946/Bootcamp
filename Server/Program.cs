using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Server.Infrastructure.Extensions;
using Server.Infrastructure.Middlewares;
using StackExchange.Profiling.Storage;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(options =>
{
    var policy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
    options.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddFrontendCors();
builder.Services.AddPersistence(builder.Configuration);
builder.Services.AddJwtAuth(builder.Configuration);
builder.Services.AddDI();
builder.Services.AddMiniProfiler(options =>
{
    options.RouteBasePath = "/profiler";
    ((MemoryCacheStorage)options.Storage).CacheDuration = TimeSpan.FromMinutes(90);

});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseMiniProfiler();
app.UseRouting();
app.UseCors("FrontendCors");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
