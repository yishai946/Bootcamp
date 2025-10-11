using Server.Application.DTOs;
using Server.Application.Exceptions;
using Server.Infrastructure.Persistence;
using Server.Domain.Entities;

namespace Server.Application.Services
{
    public class ExerciseService
    {
        private readonly Database Database;

        public ExerciseService(Database database)
        {
            Database = database;
        }

        public ExerciseDTO ConvertToDTO(Exercise exercise) => 
            new()
            {
                Id = exercise.Id,
                Rtl = exercise.Rtl,
                Title = exercise.Title,
                WorkDays = exercise.WorkDays,
                Content = ReadContentFromFile(exercise.ContentFile)
            };

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
