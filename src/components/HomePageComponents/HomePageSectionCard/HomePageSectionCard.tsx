import type { JSX, PropsWithChildren } from 'react';

type HomePageSectionCardProperties = PropsWithChildren<{
  title: string;
}>;

export const HomePageSectionCard = ({
  title,
  children,
}: HomePageSectionCardProperties): JSX.Element => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white/70 p-0 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
      <div className="flex items-start justify-between gap-2 px-4 pb-2 pt-3 sm:px-5">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="overflow-x-auto px-2 py-2 sm:px-3 sm:py-3">{children}</div>
    </section>
  );
};
