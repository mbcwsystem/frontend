import { createBrowserRouter, Navigate } from 'react-router';

import { ROUTES } from '../../shared/constants/routes';

import { AuthRoute } from './AuthRoute';

import {
  Communiity,
  DayoffPage,
  DayoffDetailPage,
  FreeboardPage,
  FreeBoardDetail,
  NoticePage,
  NoticeDetail,
  ShiftPage,
  ShiftDetailPage,
} from '@/pages/community';
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
        path: ROUTES.COMMUNITY,
        element: <Communiity />,
        children: [
          {
            index: true,
            element: <Navigate to="notice" replace />,
          },
          {
            path: 'notice',
            children: [
              { index: true, element: <NoticePage /> },
              { path: ':id', element: <NoticeDetail /> },
            ],
          },
          {
            path: 'shift',
            children: [
              { index: true, element: <ShiftPage /> },
              { path: ':id', element: <ShiftDetailPage /> },
            ],
          },
          {
            path: 'dayoff',
            children: [
              { index: true, element: <DayoffPage /> },
              { path: ':id', element: <DayoffDetailPage /> },
            ],
          },
          {
            path: 'freeboard',
            children: [
              { index: true, element: <FreeboardPage /> },
              { path: ':id', element: <FreeBoardDetail /> },
            ],
          },
        ],
      },
      {
        path: ROUTES.WORK_STATUS,
        element: <WorkStatusPage />,
      },
    ],
  },
]);
