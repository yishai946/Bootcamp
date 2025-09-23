import Column from '@components/Containers/Column';
import Row from '@components/Containers/Row';
import ErrorAlert from '@components/ErrorAlert';
import { ExerciseStatus } from '@enums/ExerciseStatus';
import useGetTeamExercises from '@hooks/Exercises/useGetTeamExercises';
import useGetUserExercises from '@hooks/Exercises/useGetUserExercises';
import { Divider, Typography } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import ExercisesPageSkeleton from '@skeletons/PageSkeleton';
import { useMemo } from 'react';
import ExerciseWithStatus from '../../types/ExerciseWithStatus';
import ExerciseCard from './ExerciseCard';
import ExerciseStepper, { getStepIcon } from './ExerciseStepper';

const Exercises = () => {
  const { user } = useUser();
  const {
    exercises: recruitExercises,
    loading: recruitLoading,
    error: recruitError,
    retry: recruitRetry,
  } = useGetUserExercises(user?.id || '');

  const {
    exercises: teamExercises,
    loading: teamLoading,
    error: teamError,
    retry: teamRetry,
  } = useGetTeamExercises(user?.teamId || '');

  const exercisesWithStatus: ExerciseWithStatus[] = useMemo(
    () =>
      teamExercises.map((exercise) => ({
        exercise,
        status:
          recruitExercises.find((recruitExercise) => recruitExercise.id === exercise.id)?.status ||
          ExerciseStatus.NotStarted,
      })),
    [teamExercises, recruitExercises]
  );

  const currentExercise =
    exercisesWithStatus.find((exercise) => exercise.status === ExerciseStatus.InProgress) ||
    exercisesWithStatus[0];

  return teamLoading || recruitLoading ? (
    <ExercisesPageSkeleton />
  ) : teamError || recruitError ? (
    <ErrorAlert error={teamError || recruitError} retry={teamError ? teamRetry : recruitRetry} />
  ) : (
    <Column flexDirection="column" width="100%" gap={2} px={4}>
      {currentExercise && (
        <>
          <Typography variant="h4" fontWeight={700} ml={6} mt={2}>
            תרגיל נוכחי
          </Typography>
          <Row gap={2} alignItems="center" mb={2}>
            {getStepIcon(currentExercise.status)}
            <ExerciseCard
              exerciseStatus={currentExercise.status}
              exercise={currentExercise.exercise}
            />
          </Row>
          <Divider />
        </>
      )}
      <Typography variant="h4" fontWeight={700} ml={6}>
        תרגילים
      </Typography>
      <ExerciseStepper steps={exercisesWithStatus} />
    </Column>
  );
};

export default Exercises;
