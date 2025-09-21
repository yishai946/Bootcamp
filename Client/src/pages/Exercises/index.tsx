import Column from '@components/Containers/Column';
import useGetTeamExercises from '@hooks/Exercises/useGetTeamExercises';
import useGetUserExercises from '@hooks/Exercises/useGetUserExercises';
import { useUser } from '@providers/UserProvider';
import ExerciseCard from './ExerciseCard';
import { ExerciseStatus } from '@enums/ExerciseStatus';
import ExercisesPageSkeleton from '@skeletons/PageSkeleton';
import ErrorAlert from '@components/ErrorAlert';
import { useMemo } from 'react';
import { Stack } from '@mui/material';
import ExerciseStepper from './ExerciseStepper';

const Tasks = () => {
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

  const exercisesWithStatus = useMemo(
    () =>
      teamExercises.map((exercise) => ({
        exercise,
        status:
          recruitExercises.find((recruitExercise) => recruitExercise.id === exercise.id)?.status ||
          ExerciseStatus.NotStarted,
      })),
    [teamExercises, recruitExercises],
  );

  return teamLoading || recruitLoading ? (
    <ExercisesPageSkeleton />
  ) : teamError || recruitError ? (
    <ErrorAlert error={teamError || recruitError} retry={teamError ? teamRetry : recruitRetry} />
  ) : (
    <Stack direction="row" alignItems="flex-start" justifyContent="center" width="100%" mt={4} spacing={3}>
      <ExerciseStepper
        steps={exercisesWithStatus.map(({ exercise, status }) => ({
          id: exercise.id,
          title: exercise.title,
          status,
        }))}
        sx={{ mt: 0.5 }}
      />
      <Column gap={4} alignItems="center" width="100%">
        {exercisesWithStatus.map(({ exercise, status }) => (
          <ExerciseCard key={exercise.id} exercise={exercise} exerciseStatus={status} />
        ))}
      </Column>
    </Stack>
  );
};

export default Tasks;
