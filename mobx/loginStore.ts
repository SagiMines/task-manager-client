import { action, computed, flow, makeAutoObservable, observable } from 'mobx';
import { NextResponse } from 'next/server';

class LoginStore {
  _username = '';
  _password = '';
  _error = '';

  constructor() {
    makeAutoObservable(this, {
      _username: observable,
      _password: observable,
      _error: observable,
      username: computed,
      password: computed,
      error: computed,
      updateUsername: action,
      updatePassword: action,
      setError: action,
      verifyUser: flow,
    });
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

  updateUsername(val: string) {
    this._username = val;
  }

  updatePassword(val: string) {
    this._password = val;
  }

  setError(val: string) {
    this._error = val;
  }

  *verifyUser(): Generator<
    Promise<Response>,
    Record<string, any>,
    NextResponse<Record<string, string | null>>
  > {
    const req = yield fetch('http://localhost:8080/auth', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: this._username,
        password: this._password,
      }),
    });
    const res = yield req.json();
    return res;
  }
}

const loginStore = new LoginStore();
export default loginStore;
