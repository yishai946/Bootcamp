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
import { useMemo, useState } from 'react';
import EventFormModal from './EventForm/EventFormModal';
import { EventFormSubmitValues } from './EventForm/EventForm.schema';
import useCalendarHandlers from '@hooks/Calendar/useCalendarHandlers';
import RecurringEventScopeDialog from './RecurringEventScopeDialog';

interface CalendarProps {
  exercises: RecruitExercise[];
  events: UserEvent[];
}

type CalendarMode =
  | { type: 'idle'; event?: undefined }
  | { type: 'view'; event: UserEvent }
  | { type: 'create'; event?: undefined }
  | { type: 'edit'; event: UserEvent };

type PendingRecurringAction =
  | { type: 'edit'; event: UserEvent; values: EventFormSubmitValues }
  | { type: 'delete'; event: UserEvent };

const Calendar = ({ exercises, events }: CalendarProps) => {
  const [mode, setMode] = useState<CalendarMode>({ type: 'idle' });
  const [pendingRecurringAction, setPendingRecurringAction] =
    useState<PendingRecurringAction | null>(null);

  const {
    handleCreateEvent,
    handleCreateRecurringEvent,
    handleDeleteEvent,
    handleUpdateEvent,
    handleDeleteRecurringOccurrence,
    handleDeleteRecurringSeries,
    handleUpdateRecurringOccurrence,
    handleUpdateRecurringSeries,
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

  const toEventPayload = (values: EventFormSubmitValues) => ({
    title: values.title,
    description: values.description,
    type: values.type,
    allDay: values.allDay,
    start: values.start,
    end: values.end,
  });

  const toRecurringPayload = (values: EventFormSubmitValues) => ({
    title: values.title,
    description: values.description,
    allDay: values.allDay,
    start: values.start,
    end: values.end,
    frequency: values.frequency,
    until: values.until,
  });

  const toOccurrencePayload = (
    values: EventFormSubmitValues,
    occurrenceStart: string
  ) => ({
    occurrenceStart,
    title: values.title,
    description: values.description,
    allDay: values.allDay,
    start: values.start,
    end: values.end,
  });

  const onDelete = (event: UserEvent) => {
    if (event.isRecurring && event.seriesId && event.occurrenceStart) {
      setPendingRecurringAction({ type: 'delete', event });
      closeModal();
      return;
    }

    if (event.isRecurring && event.seriesId) {
      handleDeleteRecurringSeries(event.seriesId);
    } else {
      handleDeleteEvent(event.id);
    }

    closeModal();
  };

  const onSubmit = (values: EventFormSubmitValues) => {
    if (mode.type === 'edit' && mode.event) {
      if (mode.event.isRecurring && mode.event.seriesId && mode.event.occurrenceStart) {
        setPendingRecurringAction({ type: 'edit', event: mode.event, values });
      } else if (mode.event.isRecurring && mode.event.seriesId) {
        setPendingRecurringAction({ type: 'edit', event: mode.event, values });
      } else {
        handleUpdateEvent(mode.event.id, {
          userId: mode.event.userId,
          ...toEventPayload(values),
        });
      }
    } else if (mode.type === 'create') {
      if (values.isRecurring) {
        handleCreateRecurringEvent(toRecurringPayload(values));
      } else {
        handleCreateEvent(toEventPayload(values));
      }
    }

    if (!(mode.type === 'edit' && mode.event?.isRecurring)) {
      closeModal();
    } else {
      setMode({ type: 'idle' });
    }
  };

  const closeRecurringActionDialog = () => setPendingRecurringAction(null);

  const applyRecurringAction = (scope: 'occurrence' | 'series') => {
    if (!pendingRecurringAction || !pendingRecurringAction.event.seriesId) {
      closeRecurringActionDialog();
      return;
    }

    const { event } = pendingRecurringAction;

    if (pendingRecurringAction.type === 'edit') {
      const values = pendingRecurringAction.values;

      if (scope === 'occurrence' && event.occurrenceStart) {
        handleUpdateRecurringOccurrence(
          event.seriesId,
          toOccurrencePayload(values, event.occurrenceStart)
        );
      } else {
        handleUpdateRecurringSeries(event.seriesId, {
          userId: event.userId,
          ...toRecurringPayload(values),
        });
      }
    } else if (scope === 'occurrence' && event.occurrenceStart) {
      handleDeleteRecurringOccurrence(event.seriesId, event.occurrenceStart);
    } else {
      handleDeleteRecurringSeries(event.seriesId);
    }

    closeRecurringActionDialog();
  };

  const canTargetOccurrence = useMemo(
    () => Boolean(pendingRecurringAction?.event.occurrenceStart),
    [pendingRecurringAction]
  );

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

      <RecurringEventScopeDialog
        open={Boolean(pendingRecurringAction)}
        action={pendingRecurringAction?.type === 'delete' ? 'delete' : 'edit'}
        onClose={closeRecurringActionDialog}
        onApplyToOccurrence={() => applyRecurringAction('occurrence')}
        onApplyToSeries={() => applyRecurringAction('series')}
        disableOccurrence={!canTargetOccurrence}
      />
    </Box>
  );
};

export default Calendar;
