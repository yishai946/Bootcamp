import { getRecruitExercises } from '@api/endpoints/recruitExercises';
import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import ExercisesPageSkeleton from '@skeletons/ExercisesPageSkeleton';
import { useQuery } from '@tanstack/react-query';
import ExerciseStepper from './ExerciseStepper';

const Exercises = () => {
  const { user } = useUser();
  const {
    data: exercises,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['userExercises', user?.id],
    queryFn: ({ queryKey }) => getRecruitExercises(queryKey[1]!),
    enabled: !!user?.id,
  });

  return isPending ? (
    <ExercisesPageSkeleton />
  ) : error ? (
    <ErrorAlert error={error} retry={refetch} />
  ) : (
    <ExerciseStepper exercises={exercises} />
  );
};

export default Exercises;
