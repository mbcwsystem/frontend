import { createBrowserRouter } from 'react-router';

import { ROUTES } from './routes';

import HomePage from '@/pages/HomePage';
import { Layout } from '@/shared/layouts/Layout';
import PayPage from '@/pages/PayPage';

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
    ],
  },
]);
