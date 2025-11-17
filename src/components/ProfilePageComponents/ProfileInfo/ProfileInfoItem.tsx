import { type JSX, type ReactNode } from 'react';
import {
  infoBlockClassName,
  infoLabelClassName,
  infoTextWrapperClassName,
} from './profile-info.styles';

type ProfileInfoItemProperties = {
  icon: ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
};

export const ProfileInfoItem = ({
  icon,
  label,
  value,
  valueClassName = 'mt-1 text-sm text-gray-900 dark:text-gray-100',
}: ProfileInfoItemProperties): JSX.Element => {
  return (
    <div className={infoBlockClassName}>
      {icon}
      <div className={infoTextWrapperClassName}>
        <p className={infoLabelClassName}>{label}</p>
        <p className={valueClassName}>{value}</p>
      </div>
    </div>
  );
};
