import { type JSX, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import {
  SalesforceAccountWithContactRequestSchema,
  type SalesforceAccountWithContactRequest,
} from '../../../api/IntegrationService/salesforce.schemas';
import { useSalesforceIntegration } from '../../../hooks/integrations/useIntegrations';
import { AuthService } from '../../../api/AuthService/AuthService';
import { useUserStore } from '../../../stores/useUserStore';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { Spinner } from '../../Spinner/Spinner';
import {
  formClassName,
  cardContainerClassName,
  cardHeaderClassName,
  cardHeaderTitleClassName,
  cardHeaderSubtitleClassName,
  cardBodyClassName,
  errorContainerClassName,
  successContainerClassName,
  successTextClassName,
  footerContainerClassName,
  footerButtonFullWidthClassName,
  footerPrimaryButtonClassName,
  saveIconClassName,
  sectionWrapperClassName,
  sectionTitleClassName,
  fieldsContainerClassName,
  sectionDividerClassName,
} from './salesforce-account-form.styles';
import { getApiError } from '../../../api/helpers/api.helpers';

type SalesforceAccountFormProperties = {
  userId?: string;
  onSuccess: () => void;
  onCancel: () => void;
};

export const SalesforceAccountForm = ({
  userId,
  onSuccess,
  onCancel,
}: SalesforceAccountFormProperties): JSX.Element => {
  const [success, setSuccess] = useState<string | undefined>();
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error: mutationError } = useSalesforceIntegration();

  const errorMessage = mutationError
    ? getApiError(mutationError).message || 'Failed to create Salesforce account. Please try again.'
    : '';

  const methods = useForm<SalesforceAccountWithContactRequest>({
    resolver: zodResolver(SalesforceAccountWithContactRequestSchema),
    defaultValues: {
      account: {
        Name: '',
        Website: '',
      },
      contact: {
        FirstName: '',
        LastName: '',
        Email: '',
      },
    },
  });

  const onSubmit = (data: SalesforceAccountWithContactRequest): void => {
    setSuccess(undefined);

    mutate(
      {
        account: data.account,
        contact: data.contact,
        ...(userId && { userId }),
      },
      {
        onSuccess: () => {
          setSuccess(`Successfully created Salesforce account and contact!`);

          void AuthService.me().then((updatedUser) => {
            setUser(updatedUser);
          });

          if (userId) {
            void queryClient.invalidateQueries({ queryKey: ['admin', 'user', userId] });
          }

          setTimeout(() => {
            onSuccess();
          }, 2000);
        },
      }
    );
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
            <h3 className={cardHeaderTitleClassName}>Create Salesforce Account</h3>
            <p className={cardHeaderSubtitleClassName}>
              Create a new Salesforce account with contact information
            </p>
          </div>

          <div className={cardBodyClassName}>
            {isError && errorMessage && (
              <div className={errorContainerClassName}>
                <ErrorBlock>{errorMessage}</ErrorBlock>
              </div>
            )}

            {success && (
              <div className={successContainerClassName}>
                <div className={successTextClassName}>{success}</div>
              </div>
            )}

            <div className={sectionWrapperClassName}>
              <div>
                <h4 className={sectionTitleClassName}>Account Information</h4>
                <div className={fieldsContainerClassName}>
                  <FormInput
                    name="account.Name"
                    label="Account Name"
                    type="text"
                    placeholder="Enter account name"
                    required
                  />

                  <FormInput
                    name="account.Website"
                    label="Website"
                    type="url"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className={sectionDividerClassName}>
                <h4 className={sectionTitleClassName}>Contact Information</h4>
                <div className={fieldsContainerClassName}>
                  <FormInput
                    name="contact.FirstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                    required
                  />

                  <FormInput
                    name="contact.LastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                    required
                  />

                  <FormInput
                    name="contact.Email"
                    label="Email"
                    type="email"
                    placeholder="contact@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={footerContainerClassName}>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className={footerButtonFullWidthClassName}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isPending || success !== undefined}
              className={footerPrimaryButtonClassName}
            >
              {isPending ? (
                <Spinner label="Creating" />
              ) : (
                <>
                  <Save className={saveIconClassName} />
                  <span>Create Account</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
