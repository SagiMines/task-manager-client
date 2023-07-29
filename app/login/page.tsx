'use client';
import Login from '@/components/Login';
import userStore from '@/mobx/userStore';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { checkIfUserAlreadyLoggedIn } from '@/utils/globalFunctions';
import Loader from '@/components/Loader';

const LoginPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    const route = '/';
    checkIfUserAlreadyLoggedIn({ push, route });
  }, []);

  return (
    <>
      {!userStore.userId && userStore.userId !== 0 && <Loader />}
      {userStore.userId === 0 && <Login />}
    </>
  );
};

export default observer(LoginPage);
