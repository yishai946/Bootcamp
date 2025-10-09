import { Role } from '@enums/Role';
import { useUser } from '@providers/UserProvider';
import { Navigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { ReactNode } from 'react';

interface Props {
  allowedRoles?: Role[];
  children: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  const { user, isPending } = useUser();

  if (isPending) return <LoadingScreen />;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;
