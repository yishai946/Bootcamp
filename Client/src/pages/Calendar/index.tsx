import { getUserEvents } from '@api/endpoints/events';
import { getRecruitExercises } from '@api/endpoints/recruitExercises';
import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingScreen from '../../Router/LoadingScreen';
import Calendar from './Calendar';

const CalendarDisplay = () => {
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
    queryKey: ['userEvents', user?.id],
    queryFn: ({ queryKey }) => getUserEvents(queryKey[1]!),
    enabled: !!user?.id,
  });

  return exercisesPending || eventsPending ? (
    <LoadingScreen />
  ) : exercisesError || eventsError ? (
    <ErrorAlert
      error={exercisesError || eventsError}
      retry={exercisesError ? exercisesRefetch : eventsRefetch}
    />
  ) : (
    <Calendar exercises={exercises} events={events} />
  );
};

export default CalendarDisplay;
