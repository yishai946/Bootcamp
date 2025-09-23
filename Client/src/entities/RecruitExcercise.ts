import { ExerciseStatus } from '@enums/ExerciseStatus';

interface RecruitExercise {
  id: string;
  recruitId: string;
  taskId: string;
  status: ExerciseStatus;
  startDate: string | null;
  crDate: string | null;
  fixDate: string | null;
  doneDate: string | null;
}

export default RecruitExercise;
