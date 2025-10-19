namespace Server.Application.Exceptions
{
    public class ForbiddenException : Exception
    {
        public ForbiddenException(string? message = null)
            : base(message ?? "You are not authorized to perform this action.")
        { }
    }
}
