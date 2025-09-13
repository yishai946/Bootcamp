import Row from '@components/Containers/Row';
import ErrorAlert from '@components/ErrorAlert';
import { EXERCISE_STATUS_INFO } from '@constants/EXERCISE_STATUS_INFO';
import RecruitExercise from '@entities/RecruitExcercise';
import { ExerciseStatus, ExerciseStatusNames } from '@enums/ExerciseStatus';
import { Box } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import ExerciseSummaryField from './ExercisesSummeryField';

interface ExercisesSummaryProps {
  exercises: RecruitExercise[];
}

const ExercisesSummary = ({ exercises }: ExercisesSummaryProps) => {
  const { user } = useUser();

  if (!user) return <ErrorAlert error="משתמש לא מחובר" />;

  const ExerciseStatuses: ExerciseStatus[] = [
    ExerciseStatus.NotStarted,
    ExerciseStatus.InProgress,
    ExerciseStatus.CodeReview,
    ExerciseStatus.Fixed,
    ExerciseStatus.Done,
  ];

  return (
    <Row justifyContent="space-between" width="100%" gap={4}>
      {ExerciseStatuses.map((status) => {
        const info = EXERCISE_STATUS_INFO[status];
        const value = exercises.filter((e) => e.status === status).length;

        return (
          <Box key={status} sx={{ flex: 1 }}>
            <ExerciseSummaryField
              title={ExerciseStatusNames[status]}
              subTitle={info.subTitle}
              value={value}
              bgColor={info.bgColor}
              icon={info.icon}
            />
          </Box>
        );
      })}
    </Row>
  );
};

export default ExercisesSummary;
