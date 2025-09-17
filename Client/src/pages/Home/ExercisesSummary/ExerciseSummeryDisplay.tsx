import ErrorAlert from '@components/ErrorAlert';
import useGetUserExercises from '@hooks/Exercises/useGetUserExercises';
import { useUser } from '@providers/UserProvider';
import ExercisesSummary from '.';
import ExerciseSummarySkeleton from '@skeletons/ExerciseSummarySkeleton';

const ExercisesSummaryDisplay = () => {
  const { user } = useUser();
  const { exercises, loading, error, retry } = useGetUserExercises(user?.id || '');

  return loading ? (
    <ExerciseSummarySkeleton />
  ) : error ? (
    <ErrorAlert error={error} retry={retry} />
  ) : (
    <ExercisesSummary exercises={exercises} />
  );
};

export default ExercisesSummaryDisplay;
