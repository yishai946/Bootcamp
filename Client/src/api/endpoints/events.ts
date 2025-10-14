import axiosInstance from '@api/axiosInstance';
import UserEvent from '@entities/UserEvent';

const getUserEvents: (userId: string, limit?: number) => Promise<UserEvent[]> = async (userId, limit) =>
  (await axiosInstance.get<UserEvent[]>(`/event/${userId}`, { params: { limit } })).data;

export { getUserEvents };
