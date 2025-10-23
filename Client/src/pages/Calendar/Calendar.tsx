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
import { EventFormSubmitValues } from './EventForm/EventForm.schema';
import useCalendarHandlers from '@hooks/Calendar/useCalendarHandlers';

interface CalendarProps {
  exercises: RecruitExercise[];
  events: UserEvent[];
}

type CalendarMode =
  | { type: 'idle'; event?: undefined }
  | { type: 'view'; event: UserEvent }
  | { type: 'create'; event?: undefined }
  | { type: 'edit'; event: UserEvent };

const Calendar = ({ exercises, events }: CalendarProps) => {
  const [mode, setMode] = useState<CalendarMode>({ type: 'idle' });

  const {
    handleCreateEvent,
    handleCreateRecurringEvent,
    handleDeleteEvent,
    handleUpdateEvent,
    handleDeleteRecurringEvent,
  } = useCalendarHandlers();

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

  const openView = (event: UserEvent) => setMode({ type: 'view', event });
  const openCreate = () => setMode({ type: 'create' });
  const openEdit = (event: UserEvent) => setMode({ type: 'edit', event });
  const closeModal = () => setMode({ type: 'idle' });

  const onDelete = (event: UserEvent) => {
    if (event.isRecurring) handleDeleteRecurringEvent(event.id);
    else handleDeleteEvent(event.id);
    closeModal();
  };

  const handleEdit = (values: EventFormSubmitValues, isRecurring: boolean) => {
    if (isRecurring) {
      // For simplicity, we delete and recreate the recurring event
      handleDeleteRecurringEvent(mode.event!.seriesId!);
      handleCreateRecurringEvent(values);
    } else {
      handleUpdateEvent(mode.event!.id, {
        userId: mode.event!.userId,
        ...values,
      });
    }
  };

  const handleCreate = (values: EventFormSubmitValues) => {
    if (values.isRecurring) {
      handleCreateRecurringEvent(values);
    } else {
      handleCreateEvent({
        title: values.title,
        description: values.description,
        type: values.type,
        allDay: values.allDay,
        start: values.start,
        end: values.end,
      });
    }
  };

  const onSubmit = (values: EventFormSubmitValues) => {
    if (mode.type === 'edit') {
      console.log(values)
      handleEdit(values, values.isRecurring);
    } else if (mode.type === 'create') {
      handleCreate(values);
    }

    closeModal();
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
              openView(info.event.extendedProps as UserEvent)
            }
          />
        </Box>

        <Fab
          color="primary"
          aria-label="add"
          onClick={openCreate}
          sx={{
            position: 'fixed',
            left: 24,
            bottom: 24,
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      {(mode.type === 'create' || mode.type === 'edit') && (
        <EventFormModal
          isOpen
          onClose={closeModal}
          onSubmit={onSubmit}
          event={mode.type === 'edit' ? mode.event : null}
          disableRecurring={mode.type === 'edit'}
        />
      )}

      {mode.type === 'view' && (
        <EventDetailsModal
          isOpen
          event={mode.event}
          onClose={closeModal}
          onEdit={() => openEdit(mode.event)}
          onDelete={() => onDelete(mode.event)}
        />
      )}
    </Box>
  );
};

export default Calendar;
