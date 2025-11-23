import type { SignInDto, SignUpDto } from '../types/auth';
import { apiClient } from './base-instance';

async function signIn(dto: SignInDto) {
  const response = await apiClient.post('auth/sign-in', { json: dto });
  return response.json();
}

async function signUp(dto: SignUpDto) {
  const response = await apiClient.post('auth/sign-up', { json: dto });
  return response.json();
}

export const authApi = {
  signIn,
  signUp,
};
