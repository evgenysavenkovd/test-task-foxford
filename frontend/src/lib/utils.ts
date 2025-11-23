import { type ClassValue, clsx } from 'clsx';
import Cookies from 'js-cookie';
import { HTTPError } from 'ky';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkAuth() {
  const authCookie = Cookies.get('is_authenticated');
  console.log({ authCookie });
  return authCookie === 'true';
}

export async function getApiError(o: unknown) {
  if (o instanceof HTTPError) {
    return o.response.json().then((body: { message?: string }) => body.message);
  }
}
