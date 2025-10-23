import EventReqDTO from 'DTOs/EventReqDTO';
import RecurringEventReqDTO from 'DTOs/RecurringEventReqDTO';
import useCalendarMutations from './useCalendarMutations';
import RecurringEventOccurrenceUpdateDTO from 'DTOs/RecurringEventOccurrenceUpdateDTO';

const CalendarHandlers = () => {
  const {
    createEvent,
    createRecurringEvent,
    deleteEvent,
    deleteRecurringEvent,
    deleteRecurringEventOccurrence,
    updateEvent,
    updateRecurringEventOccurrence,
    updateRecurringEventSeries,
  } = useCalendarMutations();

  const handleCreateEvent = (eventData: Omit<EventReqDTO, 'userId'>) => createEvent(eventData);

  const handleDeleteEvent = (eventId: string) => deleteEvent(eventId);

  const handleUpdateEvent = (eventId: string, eventData: EventReqDTO) =>
    updateEvent({ eventId, eventData });

  const handleCreateRecurringEvent = (eventData: Omit<RecurringEventReqDTO, 'userId'>) =>
    createRecurringEvent(eventData);

  const handleDeleteRecurringSeries = (seriesId: string) => deleteRecurringEvent(seriesId);

  const handleDeleteRecurringOccurrence = (seriesId: string, occurrenceStart: string) =>
    deleteRecurringEventOccurrence({ seriesId, occurrenceStart });

  const handleUpdateRecurringSeries = (seriesId: string, eventData: RecurringEventReqDTO) =>
    updateRecurringEventSeries({ seriesId, eventData });

  const handleUpdateRecurringOccurrence = (
    seriesId: string,
    eventData: RecurringEventOccurrenceUpdateDTO
  ) => updateRecurringEventOccurrence({ seriesId, eventData });

  return {
    handleCreateEvent,
    handleCreateRecurringEvent,
    handleDeleteEvent,
    handleDeleteRecurringOccurrence,
    handleDeleteRecurringSeries,
    handleUpdateEvent,
    handleUpdateRecurringOccurrence,
    handleUpdateRecurringSeries,
  };
};

export default CalendarHandlers;
