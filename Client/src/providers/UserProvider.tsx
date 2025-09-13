import User from '@entities/User';
import useGetUser from '@hooks/User/useGetUser';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: Error | unknown;
  retry: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, loading, error, retry } = useGetUser('3');

  return (
    <UserContext.Provider value={{ user, loading, error, retry }}>{children}</UserContext.Provider>
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
