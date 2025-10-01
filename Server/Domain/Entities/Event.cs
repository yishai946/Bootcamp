using System;
using Server.Domain.Enums;

namespace Server.Domain.Entities;

public class Event
{
    public virtual string Id { get; set; } = null!;
    public virtual User User { get; set; } = null!;
    public virtual EventType Type { get; set; }
    public virtual string Title { get; set; } = string.Empty;
    public virtual string? Description { get; set; }
    public virtual DateTime Start { get; set; }
    public virtual DateTime End { get; set; }
    public virtual bool AllDay { get; set; }
    public virtual DateTime CreatedAt { get; set; }
    public virtual DateTime UpdatedAt { get; set; }
}
