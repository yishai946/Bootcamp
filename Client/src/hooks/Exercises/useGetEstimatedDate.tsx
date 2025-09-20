import { useEffect, useState } from 'react';
import recruitExercises from '../../mock/RecruitExercises.json';

const useGetEstimatedDate = (userId: string) => {
  const [estimatedDateInfo, setEstimatedDateInfo] = useState<{
    estimatedDate: string;
    actualWorkDays: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | unknown>(null);

  const fetchEstimatedDateInfo = async () => {
    try {
      setLoading(true);

      const exercisesData = await new Promise<{
        estimatedDate: string;
        actualWorkDays: number;
      }>((resolve) =>
        setTimeout(
          () =>
            resolve({
              estimatedDate: recruitExercises
                .filter((exercise) => exercise.recruitId === userId)
                .reduce((latest, current) =>
                  new Date(current.endDate).getTime() > new Date(latest.endDate).getTime()
                    ? current
                    : latest
                ).endDate,
              actualWorkDays: 54,
            }),
          1000
        )
      );

      setEstimatedDateInfo(exercisesData);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchEstimatedDateInfo();
    }
  }, [userId]);

  return { estimatedDateInfo, loading, error, retry: fetchEstimatedDateInfo };
};

export default useGetEstimatedDate;
