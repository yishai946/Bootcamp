import { ExerciseStatus } from '@enums/ExerciseStatus';

interface RecruitExercise {
  id: number;
  recruitId: number;
  taskId: number;
  status: ExerciseStatus;
}

export default RecruitExercise;
