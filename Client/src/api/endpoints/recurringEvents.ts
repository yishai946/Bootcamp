import axiosInstance from '@api/axiosInstance';
import RecurringEventReqDTO from 'DTOs/RecurringEventReqDTO';

const createRecurringEvent: (eventData: RecurringEventReqDTO) => Promise<void> = async (
  eventData
) => {
  await axiosInstance.post('/RecurringEvent', eventData);
};

export { createRecurringEvent };
