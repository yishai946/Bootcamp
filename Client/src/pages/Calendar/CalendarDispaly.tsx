import { getRecruitExercises } from '@api/endpoints/recruitExercises';
import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from 'Router/LoadingScreen';
import Calendar from '.';

const CalendarDisplay = () => {
  const { user } = useUser();

  const {
    data: exercises,
    isPending: exercisesLoading,
    error: exercisesError,
    refetch: exercisesRefetch,
  } = useQuery({
    queryKey: ['userExercises', user?.id],
    queryFn: ({ queryKey }) => getRecruitExercises(queryKey[1]!),
    enabled: !!user?.id,
  });

  return exercisesLoading ? (
    <LoadingScreen />
  ) : exercisesError ? (
    <ErrorAlert error={exercisesError} retry={exercisesRefetch} />
  ) : (
    <Calendar exercises={exercises} />
  );
};

export default CalendarDisplay;
