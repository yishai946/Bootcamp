import axiosInstance from '@api/axiosInstance';
import UserEvent from '@entities/UserEvent';
import EventCreateDTO from 'DTOs/EventCreateDTO';

const getUserCalendar: (
  userId: string,
  limit?: number,
  from?: Date,
  to?: Date
) => Promise<UserEvent[]> = async (userId, limit, from, to) =>
  (await axiosInstance.get<UserEvent[]>(`/calendar/${userId}`, { params: { limit, from, to } }))
    .data;

const createUserEvent: (eventData: EventCreateDTO) => Promise<void> = async (eventData) => {
  await axiosInstance.post('/event', eventData);
};

const deleteUserEvent: (eventId: string) => Promise<void> = async (eventId) => {
  await axiosInstance.delete(`/event/${eventId}`);
};

export { getUserCalendar, createUserEvent, deleteUserEvent };
