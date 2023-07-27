'use client';
import App from '@/components/App';
import Loader from '@/components/Loader';
// import TasksList from '@/components/TasksList';
import userStore from '@/mobx/userStore';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  const { push } = useRouter();

  // Checks if there is a user existing by verifing the JWT on the server
  const checkIfUserExists = async () => {
    const res = await flowResult(userStore.checkToken());
    if (!res.userId) {
      push('/login');
    } else {
      userStore.setUserId(res.userId);
    }
  };

  useEffect(() => {
    checkIfUserExists();
  }, []);

  return (
    <main className="w-full h-full">
      {!userStore.userId && <Loader />}
      {userStore.userId && <App />}
    </main>
  );
}

export default observer(Home);
