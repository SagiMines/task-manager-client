import { makeAutoObservable } from 'mobx';
import {
  verifyUser,
  checkTokenOnServer,
  createUser,
} from '@/utils/loginFunctions';
import { FlowGenerator, User } from '@/types';

class UserStore {
  _username = '';
  _password = '';
  _confirmPassword = '';
  _error = '';
  _isSignButtonClicked = false;
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

  setUserId(val: number) {
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
}

const userStore = new UserStore();
export default userStore;
