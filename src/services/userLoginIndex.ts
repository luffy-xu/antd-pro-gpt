import { ResponseStructure } from '@/requestErrorConfig';
import { request } from '@umijs/max';

export async function signIn(
  body: API.LoginParams,
  options?: { [key: string]: any },
): Promise<ResponseStructure<API.LoginResult>> {
  return request('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function signOut(options?: { [key: string]: any }): Promise<ResponseStructure<null>> {
  return request('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function getCurrentUser(options?: {
  [key: string]: any;
}): Promise<ResponseStructure<API.CurrentUser>> {
  return request('/api/currentUser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
