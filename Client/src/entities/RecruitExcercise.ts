import { ExerciseStatus } from '@enums/ExerciseStatus';
import Exercise from './Excercise';

interface RecruitExercise {
  id: string;
  recruitId: string;
  exercise: Exercise;
  status: ExerciseStatus;
  startDate?: string;
  crDate?: string;
  fixDate?: string;
  doneDate?: string;
}

export default RecruitExercise;
