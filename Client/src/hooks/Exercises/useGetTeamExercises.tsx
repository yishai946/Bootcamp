import Exercise from '@entities/Excercise';
import { useEffect, useState } from 'react';
import exercisesMock from '../../mock/exercises.json';
import teamExercisesMock from '../../mock/teamExercises.json';

const useGetTeamExercises = (teamId: string) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  const fetchExercises = async () => {
    try {
      setLoading(true);

      // get the exercises ids for the team, ordered by the index field
      const teamExercises = teamExercisesMock
        .filter((exercise) => exercise.teamId === teamId)
        .sort((a, b) => a.index - b.index);

      const teamExercisesIds = teamExercises.map((exercise) => exercise.id);

      // get the exercises details and maintain the order
      const exercisesData = await new Promise<Exercise[] | null>((resolve) =>
        setTimeout(
          () =>
        resolve(
          teamExercisesIds
            .map((id) => exercisesMock.find((exercise) => exercise.id === id))
            .filter((exercise): exercise is Exercise => exercise !== undefined)
        ),
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
    if (teamId) {
      fetchExercises();
    }
  }, [teamId]);

  return { exercises, loading, error, retry: fetchExercises };
};

export default useGetTeamExercises;
