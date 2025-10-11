import axiosInstance from '../axiosInstance';
import LoginResDTO from 'DTOs/LoginResDTO';

const login: (username: string, password: string) => Promise<LoginResDTO> = async (
  username,
  password
) => (await axiosInstance.post<LoginResDTO>('/user/login', { username, password })).data;

export { login };
