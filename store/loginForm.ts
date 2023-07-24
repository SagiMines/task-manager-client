import { makeAutoObservable } from 'mobx';

class LoginForm {
  username = '';
  password = '';
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  updateUsername(val: string) {
    this.username = val;
  }
  updatePassword(val: string) {
    this.password = val;
  }
  setError(val: string) {
    this.error = val;
  }
}

const loginStore = new LoginForm();
export default loginStore;
