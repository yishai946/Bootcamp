import User from '@entities/User';
import users from '../mock/users.json';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  user: User | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Simulate fetching user data
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await new Promise<User | null>((resolve) =>
        setTimeout(() => resolve(users[0]), 1000)
      );

      setUser(userData);
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
