import { Roles, Statuses } from '../../../shared/types/enums';

export const profileContainerClassName =
  'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800';

export const profileHeaderClassName =
  'bg-gradient-to-r from-emerald-500 to-green-700 px-6 py-8 sm:px-8';

export const profileHeaderContentClassName =
  'flex flex-col items-center gap-4 sm:flex-row sm:gap-6';

export const avatarWrapperClassName =
  'flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg sm:h-24 sm:w-24';

export const avatarIconClassName = 'h-10 w-10 text-gray-700 sm:h-12 sm:w-12';

export const headerTextWrapperClassName = 'flex-1 text-center sm:text-left';

export const userNameClassName = 'text-2xl font-bold text-white sm:text-3xl';

export const userEmailHeaderClassName = 'mt-1 text-sm text-emerald-100 sm:text-base';

export const headerBadgesContainerClassName =
  'mt-3 flex flex-wrap justify-center gap-2 sm:justify-start';

export const badgeBaseClassName =
  'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium';

export const badgeIconClassName = 'h-3 w-3';

export const roleBadgeAdminClassName =
  'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';

export const roleBadgeUserClassName =
  'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200';

export const statusBadgeActiveClassName =
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';

export const statusBadgeInactiveClassName =
  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

export const mainInfoContainerClassName =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 p-6 sm:p-8';

export const infoBlockClassName = 'flex items-start gap-3 min-w-0';

export const infoTextWrapperClassName = 'flex-1 min-w-0';

export const infoIconWrapperEmailClassName = 'rounded-lg bg-emerald-50 p-2 dark:bg-emerald-900/30';

export const infoIconWrapperLanguageClassName = 'rounded-lg bg-green-50 p-2 dark:bg-green-900/30';

export const infoIconWrapperThemeClassName = 'rounded-lg bg-emerald-50 p-2 dark:bg-emerald-900/30';

export const infoIconWrapperMemberClassName = 'rounded-lg bg-lime-50 p-2 dark:bg-lime-900/30';

export const infoIconEmailClassName = 'h-5 w-5 text-emerald-600 dark:text-emerald-400';
export const infoIconLanguageClassName = 'h-5 w-5 text-green-600 dark:text-green-400';
export const infoIconThemeClassName = 'h-5 w-5 text-emerald-600 dark:text-emerald-400';
export const infoIconMemberClassName = 'h-5 w-5 text-lime-600 dark:text-lime-400';

export const infoLabelClassName = 'text-sm font-medium text-gray-500 dark:text-gray-400';

export const infoValueClassName = 'mt-1 text-sm text-gray-900 dark:text-gray-100';

export const infoValueEmailClassName = 'mt-1 break-all text-sm text-gray-900 dark:text-gray-100';

export const connectedAccountsContainerClassName =
  'border-t border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900/50 sm:px-8';

export const connectedAccountsTitleClassName =
  'mb-3 text-sm font-medium text-gray-700 dark:text-gray-300';

export const connectedAccountsListClassName =
  'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2';

export const connectedAccountChipClassName =
  'flex items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm dark:bg-gray-800 dark:text-gray-300';

export const googleIconClassName = 'h-4 w-4';

export const facebookIconClassName = 'h-4 w-4 text-emerald-500';

export const salesforceIconClassName = 'h-4 w-4 text-blue-500';

export const footerContainerClassName =
  'border-t border-gray-200 px-6 py-4 dark:border-gray-700 sm:px-8';

export const footerTextClassName = 'text-xs text-gray-500 dark:text-gray-400';

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getRoleBadgeClassName = (role: string): string => {
  return `${badgeBaseClassName} ${
    role === Roles.ADMIN ? roleBadgeAdminClassName : roleBadgeUserClassName
  }`;
};

export const getStatusBadgeClassName = (status: string): string => {
  return `${badgeBaseClassName} ${
    status === Statuses.ACTIVE ? statusBadgeActiveClassName : statusBadgeInactiveClassName
  }`;
};
