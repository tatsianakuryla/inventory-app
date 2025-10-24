import { Routes, Route } from 'react-router-dom';
import { type JSX } from 'react';
import { AuthPage } from '../pages/AuthPage';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />}></Route>
    </Routes>
  );
};
