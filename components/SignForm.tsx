'use client';
import userStore from '@/mobx/userStore';
import { SignFormProps } from '@/types';
import { handleSignFormClick } from '@/utils/globalFunctions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { observer } from 'mobx-react';

const SignForm = ({ signIn }: SignFormProps) => {
  const { push } = useRouter();
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign {signIn ? 'in to' : 'up and create'} your account
          </h1>
          <form className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                name="text"
                id="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="username"
                defaultValue={userStore.username}
                onChange={e => userStore.updateUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                defaultValue={userStore.password}
                onChange={e => userStore.updatePassword(e.target.value)}
                required
              />
            </div>
            {!signIn && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  defaultValue={userStore.confirmPassword}
                  onChange={e =>
                    userStore.updateConfirmPassword(e.target.value)
                  }
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={e =>
                handleSignFormClick(signIn ? { e, push, signIn } : { e, push })
              }
            >
              Sign {signIn ? 'in' : 'up'}
            </button>

            {userStore.error && (
              <p className="text-red-600 flex justify-center">
                {userStore.error}
              </p>
            )}
            {userStore.isSignButtonClicked && <Loader signAction />}

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {signIn
                ? `Don’t have an account yet? `
                : 'Already have an account? '}
              <Link
                href={signIn ? '/register' : '/login'}
                onClick={() => {
                  userStore.setIsSignButtonClicked(false);
                  userStore.setError('');
                }}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign {signIn ? 'up' : 'in'}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default observer(SignForm);
