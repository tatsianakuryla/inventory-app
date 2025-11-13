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
import type { Role } from '../../../shared/types/main.types';
import { Roles } from '../../../shared/types/enums';

export type UserNameWithInitialProperties = {
  name: string;
  role: Role;
  size?: ComponentSize;
  className?: string;
  circleClassName?: string;
  nameClassName?: string;
};

export const UserName = ({
  name,
  role = Roles.USER,
  size = 'md',
  className = '',
  circleClassName = '',
  nameClassName = '',
}: UserNameWithInitialProperties): JSX.Element => {
  const trimmed = (name ?? 'User').trim();
  const initial = trimmed[0]?.toUpperCase() ?? 'U';
  const userNameWithRole = trimmed + ' (' + role + ')';
  return (
    <div className={getTailWindClass(baseUser, containerGapBySize[size], className)}>
      <span
        aria-hidden
        title={trimmed}
        className={getTailWindClass(
          'flex select-none items-center justify-center rounded-full font-semibold',
          circleBySize[size],
          avatarVariant,
          circleClassName
        )}
        role="img"
      >
        <span className={getTailWindClass(initialTextBySize[size], 'leading-none')}>{initial}</span>
      </span>
      <span className={getTailWindClass('hidden truncate sm:inline', nameClassName)}>
        {userNameWithRole}
      </span>
    </div>
  );
};
