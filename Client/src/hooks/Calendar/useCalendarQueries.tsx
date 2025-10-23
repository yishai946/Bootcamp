import { useQuery } from '@tanstack/react-query';
import { getUserCalendar } from '@api/endpoints/events';
import { getRecruitExercises } from '@api/endpoints/recruitExercises';
import { useUser } from '@providers/UserProvider';

export const useCalendarQueries = () => {
  const { user } = useUser();

  const {
    data: exercises,
    isPending: exercisesPending,
    error: exercisesError,
    refetch: exercisesRefetch,
  } = useQuery({
    queryKey: ['recruitExercises', user?.id],
    queryFn: ({ queryKey }) => getRecruitExercises(queryKey[1]!),
    enabled: !!user?.id,
  });

  const {
    data: events,
    isPending: eventsPending,
    error: eventsError,
    refetch: eventsRefetch,
  } = useQuery({
    queryKey: ['userCalendar', user?.id],
    queryFn: ({ queryKey }) => getUserCalendar(queryKey[1]!),
    enabled: !!user?.id,
  });

  return {
    exercises,
    exercisesPending,
    exercisesError,
    exercisesRefetch,
    events,
    eventsPending,
    eventsError,
    eventsRefetch,
  };
};

export default useCalendarQueries;
