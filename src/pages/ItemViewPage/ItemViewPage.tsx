import { type JSX } from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../components/PageHeader/PageHeader';

export const ItemViewPage = (): JSX.Element => {
  const { itemId } = useParams<{ itemId: string }>();

  return (
    <>
      <PageHeader title={`Viewing item with ID: ${itemId}`} />
    </>
  );
};
