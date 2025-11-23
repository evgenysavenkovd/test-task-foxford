import { createBrowserRouter, Navigate } from 'react-router';

import { MainScreen } from './screens';

export const mainRouter = createBrowserRouter([
  {
    path: '/',
    Component: MainScreen,
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);
