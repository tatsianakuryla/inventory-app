import type { JSX, PropsWithChildren } from 'react';

type HomePageSectionCardProperties = PropsWithChildren<{
  title: string;
  description?: string;
  titleId: string;
  rightSlot?: JSX.Element;
  className?: string;
}>;

export const HomePageSectionCard = ({
  title,
  description,
  children,
  titleId,
}: HomePageSectionCardProperties): JSX.Element => {
  return (
    <section
      aria-labelledby={titleId}
      className="rounded-2xl border border-gray-200 bg-white/70 p-0 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/60"
    >
      <div className="flex items-start justify-between gap-2 px-4 pb-2 pt-3 sm:px-5">
        <div>
          <h2 id={titleId} className="text-base font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>
      <div className="h-px w-full bg-gray-200 dark:bg-gray-800" />
      <div className="overflow-x-auto px-2 py-2 sm:px-3 sm:py-3">{children}</div>
    </section>
  );
};
