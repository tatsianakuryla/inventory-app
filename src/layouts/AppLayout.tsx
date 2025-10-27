import { type JSX } from 'react';
import { Header } from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

export const AppLayout = (): JSX.Element => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
