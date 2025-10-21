import EventDetailsModal from '@components/Event/EventDetailsModal';
import UserEvent from '@entities/UserEvent';
import RecruitExercise from '@entities/RecruitExcercise';
import { EventTypeColors } from '@enums/EventType';
import { ExerciseStatus, ExerciseStatusSimplifiedColors } from '@enums/ExerciseStatus';
import heLocale from '@fullcalendar/core/locales/he';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { useState } from 'react';
import EventFormModal from './EventForm/EventFormModal';
import EventReqDTO from 'DTOs/EventReqDTO';

interface CalendarProps {
  exercises: RecruitExercise[];
  events: UserEvent[];
  handleCreateEvent: (eventData: Omit<EventReqDTO, 'userId'>) => void;
  handleDeleteEvent: (eventId: string) => void;
  handleUpdateEvent: (eventId: string, eventData: EventReqDTO) => void;
}

const Calendar = ({
  exercises,
  events,
  handleCreateEvent,
  handleDeleteEvent,
  handleUpdateEvent,
}: CalendarProps) => {
  const [selectedEvent, setSelectedEvent] = useState<UserEvent | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const getExerciseMilestones = (exercise: RecruitExercise, index: number) =>
    [
      {
        title: `${index + 1} - התחלה`,
        start: exercise.startDate || undefined,
        allDay: true,
        color: ExerciseStatusSimplifiedColors[ExerciseStatus.InProgress],
        extendedProps: { isMilestone: true },
      },
      {
        title: `${index + 2} - סיום`,
        start: exercise.doneDate || undefined,
        allDay: true,
        color: ExerciseStatusSimplifiedColors[ExerciseStatus.Done],
        extendedProps: { isMilestone: true },
      },
    ].filter((e) => !!e.start);

  const mappedEvents = events.map((e) => ({
    ...e,
    color: EventTypeColors[e.type],
    extendedProps: e,
  }));

  const mappedExercises = exercises
    .filter((e) => e.status !== ExerciseStatus.Fixed && e.status !== ExerciseStatus.CodeReview)
    .flatMap((e, i) => getExerciseMilestones(e, i * 2));

  const allEvents = [...mappedEvents, ...mappedExercises];

  const handleOpenDetails = (event: UserEvent) => {
    setIsDetailsOpen(true);
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedEvent(null);
  };

  const handleOpenForm = (event?: UserEvent) => {
    setIsDetailsOpen(false);
    setIsFormOpen(true);
    event && setSelectedEvent(event);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedEvent(null);
  };

  const onDeleteEvent = (eventId: string) => {
    handleDeleteEvent(eventId);
    handleCloseDetails();
  };

  const onCreateEvent = (eventData: Omit<EventReqDTO, 'userId'>) => {
    handleCreateEvent(eventData);
    handleCloseForm();
  };

  const onEditEvent = (eventData: Omit<EventReqDTO, 'userId'>) => {
    if (selectedEvent) {
      handleUpdateEvent(selectedEvent.id, { ...eventData, userId: selectedEvent.userId });
    }
    handleCloseForm();
  };

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
            eventClick={(info) =>
              !info.event.extendedProps.isMilestone &&
              handleOpenDetails(info.event.extendedProps as UserEvent)
            }
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
        onSubmit={selectedEvent ? onEditEvent : onCreateEvent}
        event={selectedEvent}
      />
      <EventDetailsModal
        isOpen={isDetailsOpen}
        event={selectedEvent}
        onClose={handleCloseDetails}
        onEdit={handleOpenForm}
        onDelete={onDeleteEvent}
      />
    </Box>
  );
};

export default Calendar;
