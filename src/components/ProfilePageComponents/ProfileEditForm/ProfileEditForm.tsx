import { type JSX, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Loader2 } from 'lucide-react';
import type { User } from '../../../api/UserService/user.schemas';
import { LanguageSchema, ThemeSchema } from '../../../shared/types/enums';
import { useUserStore } from '../../../stores/useUserStore';
import { UserService } from '../../../api/UserService/UserService';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { LanguageSelector } from './LanguageSelector';
import { ThemeSelector } from './ThemeSelector';
import { EmailDisplay } from './EmailDisplay';
import {
  formClassName,
  cardContainerClassName,
  cardHeaderClassName,
  cardHeaderTitleClassName,
  cardHeaderSubtitleClassName,
  cardBodyClassName,
  errorContainerClassName,
  footerContainerClassName,
  footerButtonFullWidthClassName,
  footerPrimaryButtonClassName,
  loaderIconClassName,
  saveIconClassName,
} from './profile-edit-form.styles';
import { applyTheme } from '../../../shared/helpers/theme.helpers';

type ProfileEditFormProperties = {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
};

const ProfileEditSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  language: LanguageSchema,
  theme: ThemeSchema,
});

type ProfileEditFormData = z.infer<typeof ProfileEditSchema>;

export const ProfileEditForm = ({
  user,
  onSuccess,
  onCancel,
}: ProfileEditFormProperties): JSX.Element => {
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const methods = useForm<ProfileEditFormData>({
    resolver: zodResolver(ProfileEditSchema),
    defaultValues: {
      name: user.name,
      language: user.language,
      theme: user.theme,
    },
  });

  const onSubmit = async (data: ProfileEditFormData): Promise<void> => {
    setError(undefined);
    setIsSubmitting(true);

    try {
      const updatedUser = await UserService.update({
        name: data.name === user.name ? undefined : data.name,
        language: data.language === user.language ? undefined : data.language,
        theme: data.theme === user.theme ? undefined : data.theme,
        version: user.version,
      });

      setUser(updatedUser);

      if (data.theme !== user.theme) {
        applyTheme(data.theme);
      }

      onSuccess();
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setError(caughtError.message || 'Failed to update profile. Please try again.');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(event) => {
          void methods.handleSubmit(onSubmit)(event);
        }}
        className={formClassName}
      >
        <div className={cardContainerClassName}>
          <div className={cardHeaderClassName}>
            <h3 className={cardHeaderTitleClassName}>Edit Profile</h3>
            <p className={cardHeaderSubtitleClassName}>
              Update your personal information and preferences
            </p>
          </div>

          <div className={cardBodyClassName}>
            {error && (
              <div className={errorContainerClassName}>
                <ErrorBlock>{error}</ErrorBlock>
              </div>
            )}

            <FormInput
              name="name"
              label="Name"
              type="text"
              placeholder="Enter your name"
              required
              autoComplete="name"
            />

            <LanguageSelector />

            <ThemeSelector />

            {user.email && <EmailDisplay email={user.email} />}
          </div>

          <div className={footerContainerClassName}>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className={footerButtonFullWidthClassName}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || !methods.formState.isDirty}
              className={footerPrimaryButtonClassName}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className={loaderIconClassName} />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className={saveIconClassName} />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
