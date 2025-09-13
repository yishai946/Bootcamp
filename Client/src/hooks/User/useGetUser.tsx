import User from '@entities/User';
import { useState, useEffect } from 'react';
import users from '../../mock/users.json';

const useGetUser = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | unknown>(null);

  const fetchUser = async () => {
    try {
      setLoading(true);

      const userData = await new Promise<User | null>((resolve) =>
        setTimeout(() => resolve(users.find((user) => user.id === userId) || null), 1000)
      );

      setUser(userData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return { user, loading, error, retry: fetchUser };
};

export default useGetUser;
