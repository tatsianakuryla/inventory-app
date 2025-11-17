import { type JSX } from 'react';
import type { User } from '../../../api/UserService/user.schemas';
import type { UserListItem } from '../../../api/AdminService/admin.schemas';
import { Mail, Calendar, Globe, Palette } from 'lucide-react';
import { Languages } from '../../../shared/types/enums';
import { ProfileHeader } from './ProfileHeader';
import { ProfileInfoItem } from './ProfileInfoItem';
import { ConnectedAccounts } from './ConnectedAccounts';
import {
  profileContainerClassName,
  mainInfoContainerClassName,
  infoIconWrapperEmailClassName,
  infoIconWrapperLanguageClassName,
  infoIconWrapperThemeClassName,
  infoIconWrapperMemberClassName,
  infoIconEmailClassName,
  infoIconLanguageClassName,
  infoIconThemeClassName,
  infoIconMemberClassName,
  infoValueEmailClassName,
  footerContainerClassName,
  footerTextClassName,
  formatDate,
} from './profile-info.styles';

type ProfileInfoProperties = {
  user: User | UserListItem;
};

export const ProfileInfo = ({ user }: ProfileInfoProperties): JSX.Element => {
  return (
    <div className={profileContainerClassName}>
      <ProfileHeader user={user} />

      <div className={mainInfoContainerClassName}>
        {user.email && (
          <ProfileInfoItem
            icon={
              <div className={infoIconWrapperEmailClassName}>
                <Mail className={infoIconEmailClassName} />
              </div>
            }
            label="Email"
            value={user.email}
            valueClassName={infoValueEmailClassName}
          />
        )}

        <ProfileInfoItem
          icon={
            <div className={infoIconWrapperLanguageClassName}>
              <Globe className={infoIconLanguageClassName} />
            </div>
          }
          label="Language"
          value={user.language === Languages.EN ? 'English' : 'Русский'}
        />

        <ProfileInfoItem
          icon={
            <div className={infoIconWrapperThemeClassName}>
              <Palette className={infoIconThemeClassName} />
            </div>
          }
          label="Theme"
          value={user.theme === 'LIGHT' ? 'Light Mode' : 'Dark Mode'}
        />

        <ProfileInfoItem
          icon={
            <div className={infoIconWrapperMemberClassName}>
              <Calendar className={infoIconMemberClassName} />
            </div>
          }
          label="Member Since"
          value={formatDate(user.createdAt)}
        />
      </div>

      <ConnectedAccounts
        googleId={user.googleId}
        facebookId={user.facebookId}
        salesforceIntegration={user.salesforceIntegration}
      />

      <div className={footerContainerClassName}>
        <p className={footerTextClassName}>Last updated: {formatDate(user.updatedAt)}</p>
      </div>
    </div>
  );
};
