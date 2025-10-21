enum RecurrenceFrequency {
  Daily = 0,
  Weekly,
  Monthly,
}

const RecurrenceFrequencyLabels: Record<RecurrenceFrequency, string> = {
  [RecurrenceFrequency.Daily]: 'יומי',
  [RecurrenceFrequency.Weekly]: 'שבועי',
  [RecurrenceFrequency.Monthly]: 'חודשי',
};

const recurrenceFrequencyOptions = Object.values(RecurrenceFrequency).filter(
  (value): value is RecurrenceFrequency => typeof value === 'number'
);

export { RecurrenceFrequency, RecurrenceFrequencyLabels, recurrenceFrequencyOptions };
