import { create } from 'zustand';

import { checkAuth } from '@/lib/utils';

export interface AuthState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: checkAuth(),
  setAuthenticated: (value: boolean) =>
    set((state) => ({
      ...state,
      isAuthenticated: value,
    })),
}));
