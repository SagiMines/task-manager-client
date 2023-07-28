import { UserCredentials } from '@/types';
import { callAPI } from './globalFunctions';

export const verifyUser = async (userCredentials: UserCredentials) => {
  const req = await callAPI('http://localhost:8080/auth', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(userCredentials),
  });
  const res = await req.json();
  return res;
};

export const createUser = async (userCredentials: UserCredentials) => {
  const req = await callAPI('http://localhost:8080/users', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(userCredentials),
  });
  const res = await req.json();
  return res;
};

export const checkTokenOnServer = async () => {
  const req = await callAPI('http://localhost:8080/check-token', {
    method: 'GET',
    credentials: 'include',
  });
  const res = await req.json();
  return res;
};
