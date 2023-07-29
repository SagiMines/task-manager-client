import { observer } from 'mobx-react';
import SignForm from './SignForm';

const Login = () => {
  return (
    <div className="w-full">
      <SignForm signIn={true} />
    </div>
  );
};

export default observer(Login);
