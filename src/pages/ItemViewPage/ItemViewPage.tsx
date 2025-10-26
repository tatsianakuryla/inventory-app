import { type JSX } from 'react';
import { useParams } from 'react-router-dom';

export const ItemViewPage = (): JSX.Element => {
  const { itemId } = useParams<{ itemId: string }>();

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Item View</h1>
      <p>Viewing item with ID: {itemId}</p>
    </div>
  );
};
