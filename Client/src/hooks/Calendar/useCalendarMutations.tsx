import { createUserEvent, deleteUserEvent, updateUserEvent } from '@api/endpoints/events';
import {
  createRecurringEvent as createRecurring,
  deleteRecurringEvent as deleteRecurring,
  deleteRecurringEventOccurrence as deleteRecurringOccurrence,
  updateRecurringEventOccurrence as updateRecurringOccurrence,
  updateRecurringEventSeries as updateRecurringSeries,
} from '@api/endpoints/recurringEvents';
import { useMessage } from '@providers/MessageProvider';
import { useUser } from '@providers/UserProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import EventReqDTO from 'DTOs/EventReqDTO';
import RecurringEventReqDTO from 'DTOs/RecurringEventReqDTO';
import RecurringEventOccurrenceUpdateDTO from 'DTOs/RecurringEventOccurrenceUpdateDTO';

const useCalendarMutations = () => {
  const queryClient = useQueryClient();
  const { handleChange } = useMessage();
  const { user } = useUser();

  const invalidateCalendar = () => {
    queryClient.invalidateQueries({ queryKey: ['userCalendar', user?.id] });
    queryClient.invalidateQueries({ queryKey: ['userCalendar', user?.id, 3] });
  };

  const { mutate: createEvent } = useMutation({
    mutationKey: ['createEvent'],
    mutationFn: (eventData: Omit<EventReqDTO, 'userId'>) =>
      createUserEvent({ ...eventData, userId: user!.id }),
    onSuccess: () => {
      invalidateCalendar();
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
      invalidateCalendar();
      handleChange('אירוע נמחק בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה במחיקת האירוע', 'error');
    },
  });

  const { mutate: updateEvent } = useMutation({
    mutationKey: ['updateEvent'],
    mutationFn: (data: { eventId: string; eventData: EventReqDTO }) =>
      updateUserEvent(data.eventId, data.eventData),
    onSuccess: () => {
      invalidateCalendar();
      handleChange('אירוע עודכן בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה בעדכון האירוע', 'error');
    },
  });

  const { mutate: createRecurringEvent } = useMutation({
    mutationKey: ['createRecurringEvent'],
    mutationFn: (eventData: Omit<RecurringEventReqDTO, 'userId'>) =>
      createRecurring({ ...eventData, userId: user!.id }),
    onSuccess: () => {
      invalidateCalendar();
      handleChange('אירוע מחזורי נוצר בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה ביצירת האירוע המחזורי', 'error');
    },
  });

  const { mutate: deleteRecurringEvent } = useMutation({
    mutationKey: ['deleteRecurringEvent'],
    mutationFn: (recurringEventSerialId: string) => deleteRecurring(recurringEventSerialId),
    onSuccess: () => {
      invalidateCalendar();
      handleChange('אירוע מחזורי נמחק בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה במחיקת האירוע המחזורי', 'error');
    },
  });

  const { mutate: updateRecurringEventSeries } = useMutation({
    mutationKey: ['updateRecurringEventSeries'],
    mutationFn: (data: { seriesId: string; eventData: RecurringEventReqDTO }) =>
      updateRecurringSeries(data.seriesId, data.eventData),
    onSuccess: () => {
      invalidateCalendar();
      handleChange('הסדרה המחזורית עודכנה בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה בעדכון הסדרה המחזורית', 'error');
    },
  });

  const { mutate: updateRecurringEventOccurrence } = useMutation({
    mutationKey: ['updateRecurringEventOccurrence'],
    mutationFn: (data: {
      seriesId: string;
      eventData: RecurringEventOccurrenceUpdateDTO;
    }) => updateRecurringOccurrence(data.seriesId, data.eventData),
    onSuccess: () => {
      invalidateCalendar();
      handleChange('המופע המחזורי עודכן בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה בעדכון המופע המחזורי', 'error');
    },
  });

  const { mutate: deleteRecurringEventOccurrence } = useMutation({
    mutationKey: ['deleteRecurringEventOccurrence'],
    mutationFn: (data: { seriesId: string; occurrenceStart: string }) =>
      deleteRecurringOccurrence(data.seriesId, data.occurrenceStart),
    onSuccess: () => {
      invalidateCalendar();
      handleChange('המופע המחזורי נמחק בהצלחה', 'success');
    },
    onError: () => {
      handleChange('אירעה שגיאה במחיקת המופע המחזורי', 'error');
    },
  });

  return {
    createEvent,
    createRecurringEvent,
    deleteEvent,
    updateEvent,
    deleteRecurringEvent,
    deleteRecurringEventOccurrence,
    updateRecurringEventOccurrence,
    updateRecurringEventSeries,
  };
};

export default useCalendarMutations;
