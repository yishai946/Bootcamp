import UserEvent from '@entities/UserEvent';

type EventReqDTO = Omit<UserEvent, 'id' | 'createdAt' | 'updatedAt'>;

export default EventReqDTO;
