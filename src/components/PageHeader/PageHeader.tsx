import { type JSX } from 'react';
import { PageButtonsGroup } from '../PageButtonsGroup/PageButtonsGroup';
import { titleClass } from './page-header.styles';

type PageHeaderProperties = {
  title?: string;
};

export function PageHeader({ title }: PageHeaderProperties): JSX.Element {
  return (
    <>
      {title && <h1 className={titleClass}>{title}</h1>}
      <PageButtonsGroup />
    </>
  );
}
