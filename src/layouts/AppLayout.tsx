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
        <div className="container mx-auto flex w-full max-w-7xl flex-col gap-5 py-8 sm:py-10 lg:px-6">
          <Outlet />
        </div>
      </main>
      <footer></footer>
    </>
  );
};
