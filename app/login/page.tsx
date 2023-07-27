'use client';
import Login from '@/components/Login';
import userStore from '@/mobx/userStore';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const { push } = useRouter();

  // If a user is already logged in the page will redirect to the main app
  const checkIfUserAlreadyLoggedIn = async () => {
    const res = await flowResult(userStore.checkToken());
    if (res.userId) {
      userStore.setUserId(res.userId);
      push('/');
    }
  };

  useEffect(() => {
    checkIfUserAlreadyLoggedIn();
  }, []);

  return <>{!userStore.userId && <Login />}</>;
};

export default observer(LoginPage);
