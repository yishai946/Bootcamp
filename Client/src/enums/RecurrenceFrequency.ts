enum RecurrenceFrequency {
  Daily = 'DAILY',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
}

const RecurrenceFrequencyLabels: Record<RecurrenceFrequency, string> = {
  [RecurrenceFrequency.Daily]: 'יומי',
  [RecurrenceFrequency.Weekly]: 'שבועי',
  [RecurrenceFrequency.Monthly]: 'חודשי',
};

const recurrenceFrequencyOptions = Object.values(RecurrenceFrequency) as RecurrenceFrequency[];

export { RecurrenceFrequency, RecurrenceFrequencyLabels, recurrenceFrequencyOptions };
