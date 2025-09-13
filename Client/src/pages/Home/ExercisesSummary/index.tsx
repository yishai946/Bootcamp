import Row from '@components/Containers/Row';
import ErrorAlert from '@components/ErrorAlert';
import { ExerciseStatus, ExerciseStatusNames } from '@enums/ExerciseStatus';
import { Box } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import recruitExercises from '../../../mock/RecruitExercises.json';
import ExerciseSummaryField from './ExerciseSummeryField';
import { EXERCISE_STATUS_INFO } from '@constants/EXERCISE_STATUS_INFO';

const ExercisesSummary = () => {
  const { user } = useUser();

  if (!user) return <ErrorAlert error="משתמש לא מחובר" />;

  const exercises = recruitExercises.filter((e) => e.recruitId === user.id);

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
