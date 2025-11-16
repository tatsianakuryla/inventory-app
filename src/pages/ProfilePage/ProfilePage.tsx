import { type JSX, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { ProfileInfo } from '../../components/ProfilePageComponents/ProfileInfo/ProfileInfo';
import { Button } from '../../components/Button/Button';
import { Edit2, X } from 'lucide-react';
import { PageButtonsGroup } from '../../components/PageButtonsGroup/PageButtonsGroup';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { ProfileEditForm } from '../../components/ProfilePageComponents/ProfileEditForm/ProfileEditForm';
import { SalesforceAccountForm } from '../../components/ProfilePageComponents/SalesforceAccountForm/SalesforceAccountForm';
import {
  pageContainerClassName,
  editButtonsRowClassName,
  iconButtonContentClassName,
  smallIconClassName,
} from './profile-page.styles';

export const ProfilePage = (): JSX.Element => {
  const { userId } = useParams<{ userId: string }>();
  const currentUser = useUserStore((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingSalesforce, setIsCreatingSalesforce] = useState(false);

  const isOwnProfile = currentUser?.id === userId;

  if (!isOwnProfile) {
    return <Navigate to={APP_ROUTES.HOME} replace />;
  }

  if (!currentUser) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
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
        {!isEditing && !isCreatingSalesforce && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleStartEditing}
            className={iconButtonContentClassName}
          >
            <Edit2 className={smallIconClassName} />
            <span>Edit Profile</span>
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

        {!isCreatingSalesforce && !currentUser.salesforceIntegration && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCreateSalesforceAccount}
            className={iconButtonContentClassName}
          >
            Create Salesforce Account
          </Button>
        )}
      </div>

      <div>
        {isCreatingSalesforce ? (
          <SalesforceAccountForm
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
          <ProfileInfo user={currentUser} />
        )}
      </div>
    </div>
  );
};
