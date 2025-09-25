import { ExerciseStatus } from '@enums/ExerciseStatus';
import { useState } from 'react';
import recruitExercises from '../../mock/RecruitExercises.json';

const useAdvanceExerciseStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  const nextStatus = (currentStatus: ExerciseStatus) =>
    currentStatus < ExerciseStatus.Done ? currentStatus + 1 : currentStatus;

  const advanceExerciseStatus = (exerciseId: string) => {
    const exercise = recruitExercises.find((exercise) => exercise.id === exerciseId);

    if (exercise) {
      try {
        setLoading(true);
        exercise.status = nextStatus(exercise.status);
        console.log('Updated exercise status to:', exercise);

        const updatedExercises = recruitExercises.map((ex) =>
          ex.id === exerciseId ? exercise : ex
        );

        console.log('upatedExercises:', updatedExercises);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return { loading, error, advanceExerciseStatus };
};

export default useAdvanceExerciseStatus;
