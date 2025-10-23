import axiosInstance from '@api/axiosInstance';
import RecurringEventReqDTO from 'DTOs/RecurringEventReqDTO';
import RecurringEventOccurrenceUpdateDTO from 'DTOs/RecurringEventOccurrenceUpdateDTO';

const createRecurringEvent: (eventData: RecurringEventReqDTO) => Promise<void> = async (
  eventData
) => {
  await axiosInstance.post('/RecurringEvent', eventData);
};

const deleteRecurringEvent: (recurringEventSeriesId: string) => Promise<void> = async (
  recurringEventSeriesId
) => {
  await axiosInstance.delete(`/RecurringEvent/${recurringEventSeriesId}`);
};

const updateRecurringEventSeries: (
  seriesId: string,
  eventData: RecurringEventReqDTO
) => Promise<void> = async (seriesId, eventData) => {
  await axiosInstance.put(`/RecurringEvent/${seriesId}`, eventData);
};

const updateRecurringEventOccurrence: (
  seriesId: string,
  eventData: RecurringEventOccurrenceUpdateDTO
) => Promise<void> = async (seriesId, eventData) => {
  await axiosInstance.put(`/RecurringEvent/${seriesId}/occurrence`, eventData);
};

const deleteRecurringEventOccurrence: (
  seriesId: string,
  occurrenceStart: string
) => Promise<void> = async (seriesId, occurrenceStart) => {
  await axiosInstance.delete(`/RecurringEvent/${seriesId}/occurrence`, {
    params: { occurrenceStart },
  });
};

export {
  createRecurringEvent,
  deleteRecurringEvent,
  deleteRecurringEventOccurrence,
  updateRecurringEventOccurrence,
  updateRecurringEventSeries,
};
