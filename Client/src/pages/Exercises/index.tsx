import Column from '@components/Containers/Column';
import useGetTeamExercises from '@hooks/Exercises/useGetTeamExercises';
import useGetUserExercises from '@hooks/Exercises/useGetUserExercises';
import { useUser } from '@providers/UserProvider';
import ExerciseCard from './ExerciseCard';
import { ExerciseStatus } from '@enums/ExerciseStatus';
import ExercisesPageSkeleton from '@skeletons/PageSkeleton';
import ErrorAlert from '@components/ErrorAlert';

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

  return teamLoading || recruitLoading ? (
    <ExercisesPageSkeleton />
  ) : teamError || recruitError ? (
    <ErrorAlert error={teamError || recruitError} retry={teamError ? teamRetry : recruitRetry} />
  ) : (
    <Column gap={4} alignItems="center" width="100%" mt={4}>
      {teamExercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          exerciseStatus={
            recruitExercises.find((recruitExercise) => recruitExercise.id === exercise.id)
              ?.status || ExerciseStatus.NotStarted
          }
        />
      ))}
    </Column>
  );
};

export default Tasks;
