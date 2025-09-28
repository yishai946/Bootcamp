import { ExerciseStatus } from '@enums/ExerciseStatus';

interface RecruitExercise {
  id: string;
  recruitId: string;
  taskId: string;
  status: ExerciseStatus;
  startDate: string;
  crDate: string;
  fixDate: string;
  doneDate: string;
}

export default RecruitExercise;
