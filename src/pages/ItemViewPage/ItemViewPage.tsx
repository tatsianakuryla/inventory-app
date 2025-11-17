import { type JSX } from 'react';
import { PageHeader } from '../../components/PageHeader/PageHeader';
import { container, card, content, message } from './item-view-page.styles';

export const ItemViewPage = (): JSX.Element => {
  return (
    <>
      <PageHeader title="Item View" />
      <div className={container}>
        <div className={card}>
          <div className={content}>
            <div className={message}>
              To view and edit the item card you need to get permission from the Owner or an Admin.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
