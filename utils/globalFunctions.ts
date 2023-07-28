import userStore from '@/mobx/userStore';
import { HandleSignFormClick, User } from '@/types';
import { flowResult } from 'mobx';

// Checks if we received a user or an error from the server
const isUser = (user: Record<'error', string> | User): user is User => {
  return (user as User).id !== undefined;
};

// Generic API fetcher
export const callAPI = async (
  route: RequestInfo,
  options?: RequestInit | undefined
) => {
  const req = await fetch(route, options);
  return req;
};

// Handle user's sign in/up click action
export const handleSignFormClick = async ({
  e,
  push,
  signIn,
}: HandleSignFormClick) => {
  e.preventDefault();
  userStore.setError('');
  userStore.setIsSignButtonClicked(true);
  if (signIn) {
    const res = await flowResult(userStore.verifyUser());
    if (res.error && typeof res.error === 'string') {
      userStore.setIsSignButtonClicked(false);
      userStore.setError(res.error);
    } else {
      if (typeof res.userId === 'number') {
        userStore.setUserId(res.userId);
        userStore.setIsSignButtonClicked(false);
        push('/');
      }
    }
  } else {
    const res = await flowResult(userStore.createUser());
    if (isUser(res)) {
      userStore.setUserId(res.id);
      userStore.setIsSignButtonClicked(false);
      push('/');
    } else {
      userStore.setIsSignButtonClicked(false);
      userStore.setError(res.error);
    }
  }
};
