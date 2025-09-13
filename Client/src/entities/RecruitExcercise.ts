import { ExerciseStatus } from '@enums/ExerciseStatus';

interface RecruitExercise {
  id: string;
  recruitId: string;
  taskId: string;
  status: ExerciseStatus;
}

export default RecruitExercise;
