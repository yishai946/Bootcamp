import Exercise from "@entities/Excercise";
import { ExerciseStatus } from "@enums/ExerciseStatus";

export default interface ExerciseWithStatus {
  exercise: Exercise;
  status: ExerciseStatus;
}