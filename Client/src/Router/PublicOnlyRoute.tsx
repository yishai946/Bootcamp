import { Role } from '@enums/Role';
import { useUser } from '@providers/UserProvider';
import { Navigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const PublicOnlyRoute = ({ children }: Props) => {
  const { user, isPending } = useUser();

  if (isPending) return <LoadingScreen />;

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default PublicOnlyRoute;
