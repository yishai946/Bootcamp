import User from '@entities/User';
import users from '../mock/users.json';

const login: (username: string, password: string) => Promise<User> = async (username, password) => {
  // Simulate a fetch delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // get the user by username from the mock users file
  const user = users.find((user) => user.username === username);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export { login };
