namespace Server.Exceptions
{
    public class LoginException : Exception
    {
         public LoginException() : base("Username or password are incorrect") { }

        public LoginException(string message) : base(message) { }

        public LoginException(string message, Exception? inner) : base(message, inner) { }
    }
}
