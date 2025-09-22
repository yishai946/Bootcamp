import Center from '@components/Containers/Center';
import ErrorAlert from '@components/ErrorAlert';
import { ExerciseStatus } from '@enums/ExerciseStatus';
import useGetTeamExercises from '@hooks/Exercises/useGetTeamExercises';
import useGetUserExercises from '@hooks/Exercises/useGetUserExercises';
import { useUser } from '@providers/UserProvider';
import ExercisesPageSkeleton from '@skeletons/PageSkeleton';
import { useMemo } from 'react';
import ExerciseWithStatus from '../../types/ExerciseWithStatus';
import ExerciseStepper from './ExerciseStepper';

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

  return teamLoading || recruitLoading ? (
    <ExercisesPageSkeleton />
  ) : teamError || recruitError ? (
    <ErrorAlert error={teamError || recruitError} retry={teamError ? teamRetry : recruitRetry} />
  ) : (
    <Center flexDirection="column" width="100%" mt={4}>
      <ExerciseStepper steps={exercisesWithStatus} />
    </Center>
  );
};

export default Exercises;
