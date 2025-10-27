import type { JSX } from 'react';
import { getTailWindClass } from '../../../shared/helpers/helpers';
import type { ComponentSize } from '../../../shared/types/tailwind.types';
import {
  baseUser,
  circleBySize,
  containerGapBySize,
  initialTextBySize,
  avatarVariant,
} from './user-name.styles';

export type UserNameWithInitialProperties = {
  name: string;
  size?: ComponentSize;
  className?: string;
  circleClassName?: string;
  nameClassName?: string;
};

export const UserName = ({
  name,
  size = 'md',
  className = '',
  circleClassName = '',
  nameClassName = '',
}: UserNameWithInitialProperties): JSX.Element => {
  const trimmed = (name ?? 'User').trim();
  const initial = trimmed[0]?.toUpperCase() ?? 'U';

  return (
    <div className={getTailWindClass(baseUser, containerGapBySize[size], className)}>
      <span
        aria-hidden
        title={trimmed}
        className={getTailWindClass(
          'flex items-center justify-center rounded-full font-semibold select-none',
          circleBySize[size],
          avatarVariant,
          circleClassName
        )}
        role="img"
      >
        <span className={getTailWindClass(initialTextBySize[size], 'leading-none')}>{initial}</span>
      </span>
      <span className={getTailWindClass('truncate', nameClassName)}>{trimmed}</span>
    </div>
  );
};
