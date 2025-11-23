import ky from 'ky';

import { useAuth } from '@/hooks';

import { checkAuth } from '../utils';

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  hooks: {
    afterResponse: [
      () => {
        useAuth.setState({ isAuthenticated: checkAuth() });
      },
    ],
  },
});
