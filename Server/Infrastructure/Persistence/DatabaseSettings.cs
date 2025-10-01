namespace Server.Infrastructure.Persistence;

public class DatabaseSettings
{
    public const string SectionName = "Database";

    public string ConnectionString { get; set; } = string.Empty;
    public string? Schema { get; set; }
}
