namespace Server.Domain.Entities;

public class Exercise
{
    public virtual string Id { get; set; } = null!;
    public virtual string Title { get; set; } = string.Empty;
    public virtual string ContentFile { get; set; } = string.Empty;
    public virtual double WorkDays { get; set; }
    public virtual bool IsRtl { get; set; }
}
