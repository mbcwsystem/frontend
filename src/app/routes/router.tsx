import { createBrowserRouter } from 'react-router';

import { ROUTES } from './routes';

import HomePage from '@/pages/HomePage';
import { LoginPage } from '@/pages/login';
import PayPage from '@/pages/PayPage';
import { Layout } from '@/shared/layouts/Layout';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pay',
        element: <PayPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
]);
