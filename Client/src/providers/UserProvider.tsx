import { login as apiLogin } from '@api/user';
import User from '@entities/User';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  user: User | null;
  isPending: boolean;
  error: Error | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (username: string, password: string) => {
    setIsPending(true);
    setError(null);
    try {
      const loggedInUser = await apiLogin(username, password);
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } catch (err) {
      setError(err as Error);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setIsPending(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, isPending, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };
