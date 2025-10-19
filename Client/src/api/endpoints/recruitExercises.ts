import axiosInstance from '@api/axiosInstance';
import RecruitExercise from '@entities/RecruitExcercise';

const getRecruitExercises: (userId: string) => Promise<RecruitExercise[]> = async (userId) =>
  (await axiosInstance.get<RecruitExercise[]>(`/RecruitExercise/user/${userId}`)).data;

const getById: (id: string) => Promise<RecruitExercise> = async (id: string) =>
  (await axiosInstance.get<RecruitExercise>(`/RecruitExercise/${id}`)).data;

const advanceRecruitExerciseStatus: (id: string) => Promise<void> = async (id: string) => {
  await axiosInstance.patch(`/RecruitExercise/${id}/advance`);
};

export { getRecruitExercises, getById, advanceRecruitExerciseStatus };
