import userStore from '@/mobx/userStore';
import { SignFormInputProps } from '@/types';
import { observer } from 'mobx-react';
import styles from '@/styles/SignFormInput.module.css';

const SignFormInput = ({
  label,
  type,
  nameAndIdAndHtmlFor,
  placeholder,
  onChangeName,
}: SignFormInputProps) => {
  return (
    <div key={type}>
      <label htmlFor={nameAndIdAndHtmlFor} className={styles.inputLabel}>
        {label}
      </label>
      <input
        type={type}
        name={nameAndIdAndHtmlFor}
        id={nameAndIdAndHtmlFor}
        className={styles.input}
        placeholder={placeholder}
        defaultValue={userStore[nameAndIdAndHtmlFor]}
        onChange={e => userStore[onChangeName](e.target.value)}
        required
      />
    </div>
  );
};

export default observer(SignFormInput);
