import UserEvent from '@entities/UserEvent';

type EventCreateDTO = Omit<UserEvent, 'id' | 'createdAt' | 'updatedAt'>;

export default EventCreateDTO;
