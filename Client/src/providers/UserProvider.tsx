import { login as apiLogin } from '@api/endpoints/users';
import User from '@entities/User';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  user: User | null;
  loading: boolean;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loginResponse = await apiLogin(username, password);

      setUser(loginResponse.user);

      localStorage.setItem('user', JSON.stringify(loginResponse.user));
      localStorage.setItem('token', JSON.stringify(loginResponse.token));
    } catch (err) {
      setError(err as Error);
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, error, login, logout }}>
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
