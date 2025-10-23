import ErrorAlert from '@components/ErrorAlert';
import useCalendarQueries from '@hooks/Calendar/useCalendarQueries';
import LoadingScreen from '../../Router/LoadingScreen';
import Calendar from './Calendar';

const CalendarDisplay = () => {
  const {
    exercises,
    exercisesPending,
    exercisesError,
    exercisesRefetch,
    events,
    eventsPending,
    eventsError,
    eventsRefetch,
  } = useCalendarQueries();

  return exercisesPending || eventsPending ? (
    <LoadingScreen />
  ) : exercisesError || eventsError ? (
    <ErrorAlert
      error={exercisesError || eventsError}
      retry={exercisesError ? exercisesRefetch : eventsRefetch}
    />
  ) : (
    <Calendar exercises={exercises!} events={events!} />
  );
};

export default CalendarDisplay;
