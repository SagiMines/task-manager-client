import { userCredentials } from '@/types';
import { callAPI } from './globalFunctions';

export const verifyUser = async (userCredentials: userCredentials) => {
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
