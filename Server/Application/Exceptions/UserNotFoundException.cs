namespace Server.Exceptions
{
    public class UserNotFoundException : Exception
    {
        public UserNotFoundException() : base("User was not found.") { }

        public UserNotFoundException(string message) : base(message) { }

        public UserNotFoundException(string message, Exception? inner) : base(message, inner) { }
    }
}
