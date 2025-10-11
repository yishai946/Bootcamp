using FluentNHibernate.Mapping;
using Server.Domain.Enums;
using Server.Domain.Entities;

namespace Server.Infrastructure.Persistence.Mappings
{
    public class RecruitExerciseMap : ClassMap<RecruitExercise>
    {
        public RecruitExerciseMap()
        {
            Table("recruit_exercises");

            Id(recruitExercise => recruitExercise.Id).Column("id").GeneratedBy.GuidComb();

            References(recruitExercise => recruitExercise.Recruit)
                .Column("recruit_id")
                .Not.Nullable()
                .ForeignKey("fk_re_recruit");

            References(recruitExercise => recruitExercise.Exercise)
                .Column("exercise_id")
                .Not.Nullable()
                .ForeignKey("fk_re_exercise");

            Map(recruitExercise => recruitExercise.Status)
                .Column("status")
                .CustomType<ExerciseStatus>()
                .Not.Nullable();

            Map(recruitExercise => recruitExercise.StartDate).Column("start_date");
            Map(recruitExercise => recruitExercise.CrDate).Column("cr_date");
            Map(recruitExercise => recruitExercise.FixDate).Column("fix_date");
            Map(recruitExercise => recruitExercise.DoneDate).Column("done_date");
        }
    }
}
