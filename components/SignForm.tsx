'use client';
import userStore from '@/mobx/userStore';
import { SignFormProps } from '@/types';
import { handleSignFormClick, switchRoutes } from '@/utils/globalFunctions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { observer } from 'mobx-react';
import styles from '@/styles/SignForm.module.css';
import SignFormInput from './SignFormInput';

const SignForm = ({ signIn }: SignFormProps) => {
  const { push } = useRouter();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>
            Sign {signIn ? 'in to' : 'up and create'} your account
          </h1>
          <form className={styles.form}>
            <SignFormInput
              label="Username"
              type="text"
              nameAndIdAndHtmlFor="username"
              placeholder="username"
              onChangeName="updateUsername"
            />
            <SignFormInput
              label="Password"
              type="password"
              nameAndIdAndHtmlFor="password"
              placeholder="••••••••"
              onChangeName="updatePassword"
            />
            {!signIn && (
              <SignFormInput
                label="Confirm Password"
                type="password"
                nameAndIdAndHtmlFor="confirmPassword"
                placeholder="••••••••"
                onChangeName="updateConfirmPassword"
              />
            )}
            <button
              type="submit"
              className={styles.button}
              onClick={e =>
                handleSignFormClick(signIn ? { e, push, signIn } : { e, push })
              }
            >
              Sign {signIn ? 'in' : 'up'}
            </button>

            {userStore.error && (
              <p className={styles.error}>{userStore.error}</p>
            )}
            {userStore.isSignButtonClicked && <Loader signAction />}

            <p className={styles.signUpOrInParagraph}>
              {signIn
                ? `Don’t have an account yet? `
                : 'Already have an account? '}
              <Link
                href={signIn ? '/register' : '/login'}
                onClick={switchRoutes}
                className={styles.signUpOrIn}
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
