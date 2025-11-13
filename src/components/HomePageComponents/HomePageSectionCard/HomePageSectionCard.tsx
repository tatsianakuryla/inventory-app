import type { JSX, PropsWithChildren } from 'react';
import { card, header, titleClass, content } from './home-page-section-card.styles';

type HomePageSectionCardProperties = PropsWithChildren<{
  title: string;
}>;

export const HomePageSectionCard = ({
  title,
  children,
}: HomePageSectionCardProperties): JSX.Element => {
  return (
    <section className={card}>
      <div className={header}>
        <h2 className={titleClass}>{title}</h2>
      </div>
      <div className={content}>{children}</div>
    </section>
  );
};
