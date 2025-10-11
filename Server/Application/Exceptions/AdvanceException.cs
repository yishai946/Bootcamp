namespace Server.Application.Exceptions
{
    public class AdvanceException : Exception
    {
        public AdvanceException() : base("Exercise already in last status, can't advance beyond this status") { }

        public AdvanceException(string message) : base(message) { }

        public AdvanceException(string message, Exception? inner) : base(message, inner) { }
    }
}
