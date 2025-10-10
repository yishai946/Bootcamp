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

export { getRecruitExercises, getByExerciseId };
