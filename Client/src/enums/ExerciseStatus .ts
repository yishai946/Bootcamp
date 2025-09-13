export enum ExerciseStatus {
  NotStarted,
  InProgress,
  CodeReview,
  Fixed,
  Done,
}

export const ExerciseStatusNames: Record<ExerciseStatus, string> = {
  [ExerciseStatus.NotStarted]: 'לא התחיל',
  [ExerciseStatus.InProgress]: 'בתהליך',
  [ExerciseStatus.CodeReview]: 'סקר קוד',
  [ExerciseStatus.Fixed]: 'תוקן',
  [ExerciseStatus.Done]: 'הושלם',
};
