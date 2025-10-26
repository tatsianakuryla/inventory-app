import { type JSX } from 'react';

export const HomePage = (): JSX.Element => {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Home Page</h1>
      <p>Welcome to the Inventory Management System</p>
    </div>
  );
};
