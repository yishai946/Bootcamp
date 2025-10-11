using FluentNHibernate.Mapping;
using Server.Entities;

namespace Server.Mappings
{
    public class TeamExerciseMap : ClassMap<TeamExercise>
    {
        public TeamExerciseMap()
        {
            Table("team_exercises");

            Id(teamExercise => teamExercise.Id).Column("id").GeneratedBy.GuidComb();

            References(teamExercise => teamExercise.Exercise)
                .Column("exercise_id")
                .Not.Nullable()
                .ForeignKey("fk_te_exercise");

            References(teamExercise => teamExercise.Team)
                .Column("team_id")
                .Not.Nullable()
                .ForeignKey("fk_te_team");

            Map(teamExercise => teamExercise.CreatedAt).Not.Nullable();
            Map(teamExercise => teamExercise.UpdatedAt).Not.Nullable();
            Map(teamExercise => teamExercise.Position).Not.Nullable();
        }
    }
}
