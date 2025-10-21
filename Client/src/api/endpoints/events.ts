import axiosInstance from '@api/axiosInstance';
import UserEvent from '@entities/UserEvent';
import EventReqDTO from 'DTOs/EventReqDTO';
import RecurringEventReqDTO from 'DTOs/RecurringEventReqDTO';

const getUserCalendar: (
  userId: string,
  limit?: number,
  from?: Date,
  to?: Date
) => Promise<UserEvent[]> = async (userId, limit, from, to) =>
  (await axiosInstance.get<UserEvent[]>(`/calendar/${userId}`, { params: { limit, from, to } }))
    .data;

const createUserEvent: (eventData: EventReqDTO) => Promise<void> = async (eventData) => {
  await axiosInstance.post('/event', eventData);
};

const createRecurringEvent: (eventData: RecurringEventReqDTO) => Promise<void> = async (
  eventData
) => {
  await axiosInstance.post('/recurringevent', eventData);
};

const deleteUserEvent: (eventId: string) => Promise<void> = async (eventId) => {
  await axiosInstance.delete(`/event/${eventId}`);
};

const updateUserEvent: (eventId: string, eventData: EventReqDTO) => Promise<void> = async (
  eventId,
  eventData
) => {
  await axiosInstance.put(`/event/${eventId}`, eventData);
};

export { getUserCalendar, createUserEvent, createRecurringEvent, deleteUserEvent, updateUserEvent };
