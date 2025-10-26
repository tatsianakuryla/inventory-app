import { type JSX } from 'react';
import type { Theme } from '../shared/types/main.types';
import { Header } from '../components/Header/Header';

type MainLayoutProperties = { theme: Theme };

export const MainLayout = ({ theme }: MainLayoutProperties): JSX.Element => {
  return (
    <div>
      <Header name="User" theme={theme} />
    </div>
  );
};
