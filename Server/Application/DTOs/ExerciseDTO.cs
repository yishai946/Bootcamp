using Server.Application.Exceptions;
using Server.Domain.Entities;

namespace Server.Application.DTOs
{
    public class ExerciseDTO
    {
        public Guid Id { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Content { get; set; } = default!;
        public decimal WorkDays { get; set; }
        public bool Rtl { get; set; }

        public ExerciseDTO(Exercise exercise)
        {
            Id = exercise.Id;
            Title = exercise.Title;
            Content = ReadContentFromFile(exercise.ContentFile);
            WorkDays = exercise.WorkDays;
            Rtl = exercise.Rtl;
        }

        private string ReadContentFromFile(string contentFile)
        {
            var baseDir = AppContext.BaseDirectory;
            var projectRoot = Path.GetFullPath(Path.Combine(baseDir, @"..\..\.."));
            var exercisesDir = Path.Combine(projectRoot, "Data", "Exercises");
            var fullPath = Path.Combine(exercisesDir, contentFile);

            EnsurePathExists(fullPath);

            return File.ReadAllText(fullPath);
        }

        private void EnsurePathExists(string path)
        {
            if (string.IsNullOrEmpty(path) || !File.Exists(path))
            {
                throw new NotFoundException($"path: {path} not found");
            }
        }
    }
}
