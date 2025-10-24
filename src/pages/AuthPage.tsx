import { type JSX } from 'react';

export const AuthPage = (): JSX.Element => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="rounded-2xl border p-6 text-xl">Tailwind v4 работает</div>
    </div>
  );
};
