import { type JSX } from 'react';
import { Header } from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import { mainContainer } from './app-layout.styles';

export const AppLayout = (): JSX.Element => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <div className={mainContainer}>
          <Outlet />
        </div>
      </main>
      <footer></footer>
    </>
  );
};
