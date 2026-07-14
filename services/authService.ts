import { apiRequest, setStoredToken } from './api';
import type { AuthResponse, ApiUser } from './types';

export async function loginRequest(email: string, password: string) {
  const data = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
  });
  await setStoredToken(data.token);
  return data;
}

export async function signupRequest(
  username: string,
  email: string,
  password: string,
) {
  const data = await apiRequest<AuthResponse>('/auth/signup', {
    method: 'POST',
    body: { username, email, password },
  });
  await setStoredToken(data.token);
  return data;
}

export async function fetchMe(): Promise<ApiUser> {
  const data = await apiRequest<{ success: boolean; user: ApiUser }>('/users/me', {
    auth: true,
  });
  return data.user;
}

export async function updateLocationRequest(zone: string, area: string) {
  const data = await apiRequest<{ success: boolean; user: ApiUser }>(
    '/users/me/location',
    {
      method: 'PUT',
      auth: true,
      body: { zone, area },
    },
  );
  return data.user;
}

export async function updateProfileRequest(payload: {
  username?: string;
  phone?: string;
}) {
  const data = await apiRequest<{ success: boolean; user: ApiUser }>(
    '/users/me',
    {
      method: 'PATCH',
      auth: true,
      body: payload,
    },
  );
  return data.user;
}
