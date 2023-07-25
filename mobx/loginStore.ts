import { action, computed, flow, makeAutoObservable, observable } from 'mobx';
import { verifyUser, checkTokenOnServer } from '@/utils/loginFunctions';
import { FlowGenerator } from '@/types';

class LoginStore {
  _username = '';
  _password = '';
  _error = '';
  _isUserExists = false;

  constructor() {
    makeAutoObservable(this, {
      _username: observable,
      _password: observable,
      _error: observable,
      _isUserExists: observable,
      username: computed,
      password: computed,
      error: computed,
      updateUsername: action,
      updatePassword: action,
      setError: action,
      verifyUser: flow,
      checkToken: flow,
    });
  }

  get isUserExists() {
    return this._isUserExists;
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

  updateIsUserExists(val: boolean) {
    this._isUserExists = val;
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
    Record<'error' | 'token', string | boolean | null>,
    Record<'error' | 'token', string | boolean | null>
  > {
    const res = yield verifyUser({
      username: this._username,
      password: this._password,
    });
    return res;
  }

  *checkToken(): FlowGenerator<
    Record<'token', boolean>,
    Record<'token', boolean>
  > {
    const res = yield checkTokenOnServer();
    return res;
  }
}

const loginStore = new LoginStore();
export default loginStore;
