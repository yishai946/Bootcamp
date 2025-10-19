import { createUserEvent, deleteUserEvent, getUserCalendar } from '@api/endpoints/events';
import { getRecruitExercises } from '@api/endpoints/recruitExercises';
import ErrorAlert from '@components/ErrorAlert';
import { useUser } from '@providers/UserProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingScreen from '../../Router/LoadingScreen';
import Calendar from './Calendar';
import EventCreateDTO from 'DTOs/EventCreateDTO';
import { useMessage } from '@providers/MessageProvider';

const CalendarDisplay = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { handleChange } = useMessage();

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

  const { mutate: createEvent } = useMutation({
    mutationKey: ['createEvent'],
    mutationFn: (eventData: Omit<EventCreateDTO, 'userId'>) =>
      createUserEvent({ ...eventData, userId: user!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCalendar', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['userCalendar', user?.id, 3] });
      handleChange('אירוע נוצר בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה ביצירת האירוע', 'error');
    },
  });

  const { mutate: deleteEvent } = useMutation({
    mutationKey: ['deleteEvent'],
    mutationFn: (eventId: string) => deleteUserEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userCalendar', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['userCalendar', user?.id, 3] });
      handleChange('אירוע נמחק בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה במחיקת האירוע', 'error');
    },
  });

  const handleCreateEvent = (eventData: Omit<EventCreateDTO, 'userId'>) => {
    createEvent(eventData);
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId);
  };

  return exercisesPending || eventsPending ? (
    <LoadingScreen />
  ) : exercisesError || eventsError ? (
    <ErrorAlert
      error={exercisesError || eventsError}
      retry={exercisesError ? exercisesRefetch : eventsRefetch}
    />
  ) : (
    <Calendar
      exercises={exercises}
      events={events}
      handleCreateEvent={handleCreateEvent}
      handleDeleteEvent={handleDeleteEvent}
    />
  );
};

export default CalendarDisplay;
