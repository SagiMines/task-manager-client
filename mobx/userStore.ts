import { makeAutoObservable } from 'mobx';
import { verifyUser, checkTokenOnServer } from '@/utils/loginFunctions';
import { FlowGenerator } from '@/types';

class UserStore {
  _username = '';
  _password = '';
  _error = '';
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

  get error() {
    return this._error;
  }

  setUserId(val: number) {
    this._userId = val;
  }

  updateUsername(val: string) {
    this._username = val;
  }

  updatePassword(val: string) {
    this._password = val;
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
