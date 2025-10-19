using Server.Application.Exceptions;
using System.Net;
using System.Text.Json;

namespace Server.Infrastructure.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        private static readonly Dictionary<Type, HttpStatusCode> ExceptionStatusCodes = new()
        {
            { typeof(NotFoundException), HttpStatusCode.NotFound },
            { typeof(UnauthorizedAccessException), HttpStatusCode.Unauthorized },
            { typeof(ForbiddenException), HttpStatusCode.Forbidden },
            { typeof(ArgumentException), HttpStatusCode.BadRequest },
            { typeof(KeyNotFoundException), HttpStatusCode.NotFound },
            { typeof(InvalidOperationException), HttpStatusCode.BadRequest },
            { typeof(LoginException), HttpStatusCode.Unauthorized },
            { typeof(AdvanceException), HttpStatusCode.BadRequest }
        };

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred: {Message}", ex.Message);

            var statusCode = ExceptionStatusCodes.TryGetValue(ex.GetType(), out var code)
                ? code
                : HttpStatusCode.InternalServerError;

            var problem = new
            {
                status = (int)statusCode,
                title = ex.GetType().Name,
                detail = ex.Message
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            await context.Response.WriteAsync(JsonSerializer.Serialize(problem, options));
        }
    }
}
