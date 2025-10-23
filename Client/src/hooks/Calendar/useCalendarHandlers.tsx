import EventReqDTO from 'DTOs/EventReqDTO';
import RecurringEventReqDTO from 'DTOs/RecurringEventReqDTO';
import useCalendarMutations from './useCalendarMutations';
import { deleteRecurringEvent } from '@api/endpoints/recurringEvents';

const CalendarHandlers = () => {
  const { createEvent, createRecurringEvent, deleteEvent, updateEvent } = useCalendarMutations();

  const handleCreateEvent = (eventData: Omit<EventReqDTO, 'userId'>) => createEvent(eventData);

  const handleDeleteEvent = (eventId: string) => deleteEvent(eventId);

  const handleUpdateEvent = (eventId: string, eventData: EventReqDTO) =>
    updateEvent({ eventId, eventData });

  const handleCreateRecurringEvent = (eventData: Omit<RecurringEventReqDTO, 'userId'>) =>
    createRecurringEvent(eventData);

  const handleDeleteRecurringEvent = (recurringEventSerialId: string) =>
    deleteRecurringEvent(recurringEventSerialId);

  return {
    handleCreateEvent,
    handleCreateRecurringEvent,
    handleDeleteEvent,
    handleDeleteRecurringEvent,
    handleUpdateEvent,
  };
};

export default CalendarHandlers;
