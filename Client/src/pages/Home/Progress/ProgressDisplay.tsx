import ErrorAlert from '@components/ErrorAlert';
import useGetUserExercises from '@hooks/Exercises/useGetUserExercises';
import { useUser } from '@providers/UserProvider';
import ProgressSkeleton from '@skeletons/ProgressSkeleton';
import Progress from '.';

const ProgressDisplay = () => {
  const { user } = useUser();
  const { exercises, loading, error, retry } = useGetUserExercises(user?.id || '');

  return loading ? (
    <ProgressSkeleton />
  ) : error ? (
    <ErrorAlert error={error} retry={retry} />
  ) : (
    <Progress exercises={exercises} />
  );
};

export default ProgressDisplay;
