import Exercise from '@entities/Excercise';
import { useEffect, useState } from 'react';
import exercises from '../../mock/exercises.json';

const useGetExercise = (exerciseId: string | undefined) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  const fetchExercise = async () => {
    try {
      setLoading(true);

      const exerciseData = await new Promise<Exercise | null>((resolve) =>
        setTimeout(
          () => resolve(exercises.find((exercise) => exercise.id === exerciseId) || null),
          1000
        )
      );

      setExercise(exerciseData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (exerciseId) {
      fetchExercise();
    }
  }, [exerciseId]);

  return { exercise, loading, error, retry: fetchExercise };
};

export default useGetExercise;
