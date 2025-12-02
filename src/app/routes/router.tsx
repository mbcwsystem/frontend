import { createBrowserRouter } from 'react-router';

import { AuthRoute } from './AuthRoute';
import { ROUTES } from './routes';

import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import PayPage from '@/pages/PayPage';
import SchedulePage from '@/pages/SchedulePage';
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
        path: 'schedule',
        element: <SchedulePage />,
      },
    ],
  },
]);
