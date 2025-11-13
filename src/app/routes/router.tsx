import { createBrowserRouter } from 'react-router';

import { ROUTES } from './routes';

import { Layout } from '@/shared/layouts/Layout';

export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Layout />,
  },
]);
