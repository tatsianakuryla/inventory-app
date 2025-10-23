import { Routes, Route } from 'react-router-dom';
import { type JSX } from 'react';

export const AppRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<>Hello, world</>}></Route>
    </Routes>
  );
};
