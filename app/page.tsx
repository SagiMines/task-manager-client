'use client';
import App from '@/components/App';
import Loader from '@/components/Loader';
// import TasksList from '@/components/TasksList';
import loginStore from '@/mobx/loginStore';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Home() {
  const { push } = useRouter();

  // Checks if there is a user existing by verifing the JWT on the server
  const checkIfUserExists = async () => {
    const res = await flowResult(loginStore.checkToken());
    if (!res.token) {
      push('/login');
    } else {
      loginStore.updateIsUserExists(res.token);
    }
  };

  useEffect(() => {
    checkIfUserExists();
  }, []);

  return (
    <main className="w-full h-full">
      {!loginStore.isUserExists && <Loader />}
      {loginStore.isUserExists && <App />}
    </main>
  );
}

export default observer(Home);
