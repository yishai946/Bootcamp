using FluentNHibernate.Mapping;
using Server.Domain.Entities;
using Server.Domain.Enums;

namespace Server.Infrastructure.Mappings;

public class RecruitExerciseMap : ClassMap<RecruitExercise>
{
    public RecruitExerciseMap()
    {
        Table("recruit_exercises");
        Id(x => x.Id).Column("id").GeneratedBy.Assigned();
        References(x => x.Recruit).Column("recruit_id").Not.Nullable();
        References(x => x.Exercise).Column("exercise_id").Not.Nullable();
        Map(x => x.Status).Column("status").CustomType<ExerciseStatus>().Not.Nullable();
        Map(x => x.StartDate).Column("start_date").Not.Nullable();
        Map(x => x.CodeReviewDate).Column("code_review_date");
        Map(x => x.FixDate).Column("fix_date");
        Map(x => x.DoneDate).Column("done_date");
    }
}
