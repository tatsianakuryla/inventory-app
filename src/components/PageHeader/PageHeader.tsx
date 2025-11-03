import { type JSX } from 'react';
import { PageButtonsGroup } from '../PageButtonsGroup/PageButtonsGroup';

type PageHeaderProperties = {
  title: string;
};

export function PageHeader({ title }: PageHeaderProperties): JSX.Element {
  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <PageButtonsGroup />
    </>
  );
}
