import { makeAutoObservable } from 'mobx';
import {
  verifyUser,
  checkTokenOnServer,
  createUser,
  logoutFromApp,
} from '@/utils/userFunctions';
import { FlowGenerator, User } from '@/types';

class UserStore {
  // User's username
  _username = '';
  // User's password
  _password = '';
  // User's confirm username
  _confirmPassword = '';
  // If there is an error in the login/register process the error will be saved here
  _error = '';
  // When the login/register form is submitted the value will be set to true
  _isSignButtonClicked = false;
  // Saves the user's ID when he logs in
  _userId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get userId() {
    return this._userId;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  get confirmPassword() {
    return this._confirmPassword;
  }

  get error() {
    return this._error;
  }

  get isSignButtonClicked() {
    return this._isSignButtonClicked;
  }

  setUserId(val: number | null) {
    this._userId = val;
  }

  setIsSignButtonClicked(val: boolean) {
    this._isSignButtonClicked = val;
  }

  updateUsername(val: string) {
    this._username = val;
  }

  updatePassword(val: string) {
    this._password = val;
  }

  updateConfirmPassword(val: string) {
    this._confirmPassword = val;
  }

  setError(val: string) {
    this._error = val;
  }

  *verifyUser(): FlowGenerator<
    Record<'error' | 'userId', string | number>,
    Record<'error' | 'userId', string | number>
  > {
    const res = yield verifyUser({
      username: this._username,
      password: this._password,
    });
    return res;
  }

  *createUser(): FlowGenerator<
    Record<'error', string> | User,
    Record<'error', string> | User
  > {
    const res = yield createUser({
      username: this._username,
      password: this._password,
      confirmPassword: this._confirmPassword,
    });
    return res;
  }

  *checkToken(): FlowGenerator<
    Record<'userId', number | null>,
    Record<'userId', number | null>
  > {
    const res = yield checkTokenOnServer();
    return res;
  }

  *logout(): FlowGenerator<
    Record<'error' | 'done', string | boolean>,
    Record<'error' | 'done', string | boolean>
  > {
    const res = yield logoutFromApp();
    return res;
  }
}

const userStore = new UserStore();
export default userStore;
