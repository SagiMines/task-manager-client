'use client';
import Loader from '@/components/Loader';
import Register from '@/components/Register';
import userStore from '@/mobx/userStore';
import { checkIfUserAlreadyLoggedIn } from '@/utils/globalFunctions';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const RegisterPage = () => {
  const { push } = useRouter();

  useEffect(() => {
    const route = '/';
    checkIfUserAlreadyLoggedIn({ push, route });
  }, []);

  return (
    <>
      {!userStore.userId && userStore.userId !== 0 && <Loader />}
      {userStore.userId === 0 && <Register />}
    </>
  );
};

export default observer(RegisterPage);
