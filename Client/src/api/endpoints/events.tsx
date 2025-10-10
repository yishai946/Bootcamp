import axiosInstance from '@api/axiosInstance';
import UserEvent from '@entities/UserEvent';

const getUserEvents: (userId: string) => Promise<UserEvent[]> = async (userId) =>
  (await axiosInstance.get<UserEvent[]>(`/event/${userId}`)).data;

export { getUserEvents };
