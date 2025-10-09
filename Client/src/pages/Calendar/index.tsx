import ErrorAlert from '@components/ErrorAlert';
import EventDetailsModal from '@components/Event/EventDetailsModal';
import Event from '@entities/Event';
import RecruitExercise from '@entities/RecruitExcercise';
import { EventTypeColors } from '@enums/EventType';
import { ExerciseStatus, ExerciseStatusSimplifiedColors } from '@enums/ExerciseStatus';
import heLocale from '@fullcalendar/core/locales/he';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import useGetUserEvents from '@hooks/Events/useGetUserEvents';
import useGetUserExercises from '@hooks/RecruitExercises/useGetUserExercises';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { useUser } from '@providers/UserProvider';
import { useState } from 'react';
import LoadingScreen from '../../Router/LoadingScreen';
import EventFormModal from './EventForm/EventFormModal';

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { user, isPending: userLoading, error: userError } = useUser();
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

  const getExerciseMilestones = (exercise: RecruitExercise, index: number) =>
    [
      {
        title: `${index + 1} - התחלה`,
        start: exercise.startDate || undefined,
        allDay: true,
        color: ExerciseStatusSimplifiedColors[ExerciseStatus.InProgress],
      },
      {
        title: `${index + 2} - סיום`,
        start: exercise.doneDate || undefined,
        allDay: true,
        color: ExerciseStatusSimplifiedColors[ExerciseStatus.Done],
      },
    ].filter((e) => !!e.start);

  const mappedEvents = events.map((e) => ({ ...e, color: EventTypeColors[e.type] }));
  const mappedExercises = exercises
    .filter((e) => e.status !== ExerciseStatus.Fixed && e.status !== ExerciseStatus.CodeReview)
    .flatMap((e, i) => getExerciseMilestones(e, i * 2));
  const allEvents = [...mappedEvents, ...mappedExercises];

  const handleOpenDetails = (event: Event) => {
    setIsDetailsOpen(true);
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenForm = (event?: Event) => {
    setIsDetailsOpen(false);
    setIsFormOpen(true);
    event && setSelectedEvent(event);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  if (eventsLoading || userLoading || exercisesLoading) return <LoadingScreen />;
  if (eventsError || userError || exercisesError) {
    return (
      <ErrorAlert
        error={eventsError || userError || exercisesError}
        retry={eventsRetry || exercisesRetry}
      />
    );
  }

  return (
    <Box height="100%">
      <Box
        sx={{
          width: '80%',
          height: '100%',
          mx: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
        }}
      >
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <FullCalendar
            height="100%"
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locales={[heLocale]}
            locale="he"
            events={allEvents}
            showNonCurrentDates={false}
            fixedWeekCount={false}
            eventClick={(info) => {
              const id = info.event.id;
              const original = events.find((e) => e.id === id);

              if (original) {
                handleOpenDetails(original);
              }
            }}
          />
        </Box>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => handleOpenForm()}
          sx={{
            position: 'fixed',
            left: 24,
            bottom: 24,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <EventFormModal
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={async (values) => {
          // Handle event creation
          console.log('Creating event with values:', values);
          setIsFormOpen(false);
        }}
        event={selectedEvent}
      />
      <EventDetailsModal
        isOpen={isDetailsOpen}
        event={selectedEvent}
        onClose={handleCloseDetails}
        onEdit={handleOpenForm}
      />
    </Box>
  );
};

export default Calendar;
