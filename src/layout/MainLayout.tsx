import { type JSX } from 'react';
import type { Theme } from '../shared/types/main.types';
import { Header } from '../components/Header/Header';

type MainLayoutProperties = { theme: Theme };

export const MainLayout = ({ theme }: MainLayoutProperties): JSX.Element => {
  return (
    <div>
      <Header theme={theme} />
    </div>
  );
};
