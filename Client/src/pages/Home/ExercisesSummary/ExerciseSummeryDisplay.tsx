import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import ExercisesSummary from '.';
import ExerciseSummarySkeleton from '@skeletons/ExerciseSummarySkeleton';
import { useQuery } from '@tanstack/react-query';
import { getRecruitExercises } from '@api/endpoints/recruitExercises';

const ExercisesSummaryDisplay = () => {
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
    <ExerciseSummarySkeleton />
  ) : error ? (
    <ErrorAlert error={error} retry={refetch} />
  ) : (
    <ExercisesSummary exercises={exercises} />
  );
};

export default ExercisesSummaryDisplay;
