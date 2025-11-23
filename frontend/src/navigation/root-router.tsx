import { RouterProvider } from 'react-router';

import { useAuth } from '@/hooks';

import { authRouter } from './auth';
import { mainRouter } from './main';

export const RootRouter = () => {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);

  return <RouterProvider router={isAuthenticated ? mainRouter : authRouter} />;
};
