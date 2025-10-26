import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export const ProfilePage = (): JSX.Element => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">User Profile</h1>
      <p>Profile page for user with ID: {userId}</p>
    </div>
  );
};
