import { createBrowserRouter } from 'react-router';

import { ROUTES } from '../../shared/constants/routes';

import { AuthRoute } from './AuthRoute';

import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import PayPage from '@/pages/PayPage';
import { WorkStatusPage } from '@/pages/work-status';
import { Layout } from '@/shared/layouts/Layout';
import PublicLayout from '@/shared/layouts/PublicLayout';

export const router = createBrowserRouter([
  //public routes
  {
    path: ROUTES.ROOT,
    element: (
      <AuthRoute isPublic>
        <PublicLayout />
      </AuthRoute>
    ),
    children: [
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
  // private routes
  {
    path: ROUTES.ROOT,
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.PAY,
        element: <PayPage />,
      },
      {
        path: ROUTES.WORK_STATUS,
        element: <WorkStatusPage />,
      },
    ],
  },
]);
