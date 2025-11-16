import { type JSX } from 'react';
import { User as UserIcon, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Statuses } from '../../../shared/types/enums';
import type { User } from '../../../api/UserService/user.schemas';
import {
  profileHeaderClassName,
  profileHeaderContentClassName,
  avatarWrapperClassName,
  avatarIconClassName,
  headerTextWrapperClassName,
  userNameClassName,
  userEmailHeaderClassName,
  headerBadgesContainerClassName,
  badgeIconClassName,
  getRoleBadgeClassName,
  getStatusBadgeClassName,
} from './profile-info.styles';

type ProfileHeaderProperties = {
  user: User;
};

export const ProfileHeader = ({ user }: ProfileHeaderProperties): JSX.Element => {
  return (
    <div className={profileHeaderClassName}>
      <div className={profileHeaderContentClassName}>
        <div className={avatarWrapperClassName}>
          <UserIcon className={avatarIconClassName} />
        </div>

        <div className={headerTextWrapperClassName}>
          <h2 className={userNameClassName}>{user.name}</h2>

          {user.email && <p className={userEmailHeaderClassName}>{user.email}</p>}

          <div className={headerBadgesContainerClassName}>
            <span className={getRoleBadgeClassName(user.role)}>
              <Shield className={badgeIconClassName} />
              {user.role}
            </span>

            <span className={getStatusBadgeClassName(user.status)}>
              {user.status === Statuses.ACTIVE ? (
                <CheckCircle className={badgeIconClassName} />
              ) : (
                <XCircle className={badgeIconClassName} />
              )}
              {user.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
