import axiosInstance from '@api/axiosInstance';
import RecruitExercise from '@entities/RecruitExcercise';

const getRecruitExercises: (userId: string) => Promise<RecruitExercise[]> = async (userId) =>
  (await axiosInstance.get<RecruitExercise[]>(`/RecruitExercise/${userId}`)).data;

const getByExerciseId: (
  exerciseId: string,
  recruitId: string
) => Promise<RecruitExercise> = async (exerciseId, recruitId) =>
  (
    await axiosInstance.get<RecruitExercise>(
      `/RecruitExercise/${recruitId}/exercise/${exerciseId}`
    )
  ).data;

const advanceRecruitExerciseStatus: (userId: string, exerciseId: string) => Promise<void> = async (userId, exerciseId) => {
  await axiosInstance.patch(`/RecruitExercise/${userId}/exercise/${exerciseId}/advance`);
};

export { getRecruitExercises, getByExerciseId, advanceRecruitExerciseStatus };
