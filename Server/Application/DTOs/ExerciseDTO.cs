namespace Server.Application.DTOs
{
    public class ExerciseDTO
    {
        public Guid Id { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Content { get; set; } = default!;
        public decimal WorkDays { get; set; }
        public bool Rtl { get; set; }
    }
}
