import { type JSX } from 'react';
import type { Theme } from '../shared/types/main.types';
import { Header } from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

type AppLayoutProperties = { theme: Theme };

export const AppLayout = ({ theme }: AppLayoutProperties): JSX.Element => {
  return (
    <>
      <header>
        <Header theme={theme} />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
