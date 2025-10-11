namespace Server.Application.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException() : base("Resource requested not found") { }

        public NotFoundException(string message) : base(message) { }

        public NotFoundException(string message, Exception? inner) : base(message, inner) { }
    }
}
