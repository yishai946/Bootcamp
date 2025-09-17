import RecruitExercise from '@entities/RecruitExcercise';
import { useEffect, useState } from 'react';
import recruitExercises from '../../mock/RecruitExercises.json';

const useGetUserExercises = (userId: string) => {
  const [exercises, setExercises] = useState<RecruitExercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  const fetchExercises = async () => {
    try {
      setLoading(true);

      const exercisesData = await new Promise<RecruitExercise[] | null>((resolve) =>
        setTimeout(
          () => resolve(recruitExercises.filter((exercise) => exercise.recruitId === userId)),
          1000
        )
      );

      setExercises(exercisesData || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchExercises();
    }
  }, [userId]);

  return { exercises, loading, error, retry: fetchExercises };
};

export default useGetUserExercises;
