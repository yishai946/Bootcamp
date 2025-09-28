import { EventType } from '@enums/EventType';

interface Event {
  id: string;
  userId: string;
  type: EventType;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay: boolean;
  createdAt: string;
  updatedAt: string;
}

export default Event;
