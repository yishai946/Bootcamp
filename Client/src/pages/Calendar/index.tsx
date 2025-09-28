import ErrorAlert from '@components/ErrorAlert';
import RecruitExercise from '@entities/RecruitExcercise';
import { EventTypeColors } from '@enums/EventType';
import {
  ExerciseStatus,
  ExerciseStatusSimplifiedColors
} from '@enums/ExerciseStatus';
import heLocale from '@fullcalendar/core/locales/he';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import useGetUserEvents from '@hooks/Events/useGetUserEvents';
import useGetUserExercises from '@hooks/Exercises/useGetUserExercises';
import { Box } from '@mui/material';
import { useUser } from '@providers/UserProvider';

const Calendar = () => {
  const { user, loading: userLoading, error: userError, retry: userRetry } = useUser();
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
    retry: eventsRetry,
  } = useGetUserEvents(user?.id || '');

  const {
    exercises,
    loading: exercisesLoading,
    error: exercisesError,
    retry: exercisesRetry,
  } = useGetUserExercises(user?.id || '');

  const getExerciseMilestones = (exercise: RecruitExercise, index: number) => {
    return [
      {
        title: `${index + 1} - התחלה`,
        start: exercise.startDate,
        allDay: true,
        color: ExerciseStatusSimplifiedColors[ExerciseStatus.InProgress],
      },
      {
        title: `${index + 2} - סיום`,
        start: exercise.doneDate,
        allDay: true,
        color: ExerciseStatusSimplifiedColors[ExerciseStatus.Done],
      },
    ];
  };

  const mappedEvents = events.map((event) => ({
    ...event,
    color: EventTypeColors[event.type],
  }));

  const mappedExercises = exercises
    .filter(
      (exercise) =>
        exercise.status != ExerciseStatus.Fixed && exercise.status != ExerciseStatus.CodeReview
    )
    .map((exercise, index) => getExerciseMilestones(exercise, index * 2))
    .flat();

  const allEvents = [...mappedEvents, ...mappedExercises];

  return eventsLoading || userLoading || exercisesLoading ? (
    <Box>Loading...</Box>
  ) : eventsError || userError || exercisesError ? (
    <ErrorAlert
      error={eventsError || userError || exercisesError}
      retry={eventsRetry || userRetry || exercisesRetry}
    />
  ) : (
    <Box height="100%" width="70%">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[heLocale]}
        locale="he"
        height="100%"
        events={allEvents}
        eventClick={(info) => {
          alert(
            `Event: ${info.event.title}\nDate: ${info.event.start?.toLocaleDateString('he-IL')}`
          );
        }}
      />
    </Box>
  );
};

export default Calendar;
