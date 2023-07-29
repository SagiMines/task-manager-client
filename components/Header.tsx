'use client';
import { handleLogoutClick } from '@/utils/globalFunctions';
import { useRouter } from 'next/navigation';
import styles from '@/styles/Header.module.css';

const Header = () => {
  const { push } = useRouter();

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => handleLogoutClick({ push })}
        className={styles.button}
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
