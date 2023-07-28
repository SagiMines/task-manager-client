import { observer } from 'mobx-react';
import SignForm from './SignForm';

const Login = () => {
  return (
    <section className="w-full">
      <SignForm signIn={true} />
    </section>
  );
};

export default observer(Login);
