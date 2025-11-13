import type { JSX } from 'react';
import { Outlet } from 'react-router-dom';
import * as styles from './auth-layout.styles';

export function AuthLayout(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div aria-hidden className={styles.background} />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
