'use client';

import userStore from '@/mobx/userStore';
import { flowResult } from 'mobx';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { push } = useRouter();
  const handleClick = async () => {
    const res = await flowResult(userStore.logout());
    if (res.done) {
      //   console.log(res.done);
      userStore.setUserId(null);
      push('/login');
    }
  };

  return (
    <div className="flex justify-end mr-5 mt-5">
      <button
        type="button"
        onClick={handleClick}
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
