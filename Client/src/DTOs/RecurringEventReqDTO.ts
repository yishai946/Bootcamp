import { RecurrenceFrequency } from '@enums/RecurrenceFrequency';

interface RecurringEventReqDTO {
  userId: string;
  title: string;
  description?: string;
  allDay: boolean;
  start: string;
  end?: string;
  frequency: RecurrenceFrequency;
  interval: number;
  until?: string;
}

export default RecurringEventReqDTO;
