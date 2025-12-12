import { Navigate } from 'react-router';

import { ROUTES } from '../../shared/constants/routes';

import type { PropsWithChildren } from 'react';

import { useAuthStore } from '@/shared/model/authStore';

interface AuthRouteProps extends PropsWithChildren {
  isPublic?: boolean;
}
export const AuthRoute = ({ isPublic, children }: AuthRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isPublic && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (isPublic && isAuthenticated) {
    return <Navigate to={ROUTES.ROOT} replace />;
  }

  return <>{children}</>;
};
