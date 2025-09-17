import { EventType } from '@enums/EventType';

interface Event {
  id: string;
  userId: string;
  type: EventType;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export default Event;
