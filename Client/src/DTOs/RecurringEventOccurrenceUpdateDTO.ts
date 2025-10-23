interface RecurringEventOccurrenceUpdateDTO {
  occurrenceStart: string;
  title: string;
  description?: string;
  allDay: boolean;
  start: string;
  end?: string;
}

export default RecurringEventOccurrenceUpdateDTO;
