import User from '@entities/User';

interface LoginResDTO {
  token: string;
  user: User;
}

export default LoginResDTO;
