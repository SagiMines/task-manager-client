'use client';
import App from '@/components/App';
import Loader from '@/components/Loader';
import userStore from '@/mobx/userStore';
import { checkIfUserAlreadyLoggedIn } from '@/utils/globalFunctions';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  const { push } = useRouter();

  useEffect(() => {
    const route = '/login';
    const mainRoute = true;
    checkIfUserAlreadyLoggedIn({ push, route, mainRoute });
  }, []);

  return (
    <main>
      {!userStore.userId && <Loader />}
      {userStore.userId && <App />}
    </main>
  );
}

export default observer(Home);
