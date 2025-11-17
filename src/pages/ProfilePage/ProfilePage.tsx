import { type JSX, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { ProfileInfo } from '../../components/ProfilePageComponents/ProfileInfo/ProfileInfo';
import { Button } from '../../components/Button/Button';
import { Edit2, X, Cloud } from 'lucide-react';
import { PageButtonsGroup } from '../../components/PageButtonsGroup/PageButtonsGroup';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { ProfileEditForm } from '../../components/ProfilePageComponents/ProfileEditForm/ProfileEditForm';
import { SalesforceAccountForm } from '../../components/ProfilePageComponents/SalesforceAccountForm/SalesforceAccountForm';
import { Roles } from '../../shared/types/enums';
import { useGetUserById } from '../../hooks/admin/useAdminUsers';
import {
  pageContainerClassName,
  editButtonsRowClassName,
  iconButtonContentClassName,
  smallIconClassName,
  textFullClassName,
  textShortClassName,
} from './profile-page.styles';

export const ProfilePage = (): JSX.Element => {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = useUserStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingSalesforce, setIsCreatingSalesforce] = useState(false);

  const isOwnProfile = currentUser?.id === userId;
  const isAdmin = currentUser?.role === Roles.ADMIN;
  const canViewProfile = isOwnProfile || isAdmin;

  const shouldFetchUser = !isOwnProfile && !!userId;
  const { data: viewedUser, isLoading } = useGetUserById(userId ?? '', shouldFetchUser);

  const profileUser = isOwnProfile ? currentUser : viewedUser;

  if (!canViewProfile) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  }

  if (isLoading && !isOwnProfile) {
    return <div>Loading...</div>;
  }

  if (!profileUser) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  const handleStartEditing = (): void => {
    setIsEditing(true);
  };

  const handleCancelEditing = (): void => {
    setIsEditing(false);
  };

  const handleEditSuccess = (): void => {
    setIsEditing(false);
  };

  const handleCreateSalesforceAccount = (): void => {
    setIsCreatingSalesforce(true);
  };

  const handleCancelSalesforce = (): void => {
    setIsCreatingSalesforce(false);
  };

  const handleSalesforceSuccess = (): void => {
    setIsCreatingSalesforce(false);
  };

  return (
    <div className={pageContainerClassName}>
      <PageButtonsGroup />

      <div className={editButtonsRowClassName}>
        {isOwnProfile && !isEditing && !isCreatingSalesforce && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStartEditing}
            className={iconButtonContentClassName}
          >
            <Edit2 className={smallIconClassName} />
            <span className={textFullClassName}>Edit Profile</span>
            <span className={textShortClassName}>Edit</span>
          </Button>
        )}

        {isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelEditing}
            className={iconButtonContentClassName}
          >
            <X className={smallIconClassName} />
            <span>Cancel</span>
          </Button>
        )}

        {isCreatingSalesforce && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelSalesforce}
            className={iconButtonContentClassName}
          >
            <X className={smallIconClassName} />
            <span>Cancel</span>
          </Button>
        )}

        {!isCreatingSalesforce && !profileUser.salesforceIntegration && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateSalesforceAccount}
            className={iconButtonContentClassName}
          >
            <Cloud className={smallIconClassName} />
            <span className={textFullClassName}>Create Salesforce Account</span>
            <span className={textShortClassName}>Salesforce</span>
          </Button>
        )}
      </div>

      <div>
        {isCreatingSalesforce ? (
          <SalesforceAccountForm
            userId={profileUser.id}
            onSuccess={handleSalesforceSuccess}
            onCancel={handleCancelSalesforce}
          />
        ) : isEditing ? (
          <ProfileEditForm
            user={currentUser}
            onSuccess={handleEditSuccess}
            onCancel={handleCancelEditing}
          />
        ) : (
          <ProfileInfo user={profileUser} />
        )}
      </div>
    </div>
  );
};
