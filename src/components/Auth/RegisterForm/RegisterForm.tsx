import type { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { RegisterPayloadSchema, type RegisterPayload } from '../../../api/AuthService/auth.schemas';
import { getApiError } from '../../../api/helpers/api.helpers';
import { useRegister } from '../../../hooks/auth/useRegister';
import { Spinner } from '../../Spinner/Spinner';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import {
  AUTH_ERROR_MESSAGES,
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  BUTTON_LABELS,
} from '../../../shared/constants/messages';
import { UI_CONSTANTS, HTTP_STATUS } from '../../../shared/constants/validation';
import { formClass, submitButton } from './register-form.styles';

const DEFAULT_REGISTER_VALUES: RegisterPayload = { email: '', password: '', name: '' };

export const RegisterForm = (): JSX.Element => {
  const methods = useForm<RegisterPayload>({
    resolver: zodResolver(RegisterPayloadSchema),
    defaultValues: DEFAULT_REGISTER_VALUES,
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { handleSubmit, formState, setError, clearErrors } = methods;
  const { errors } = formState;
  const registerMutation = useRegister();
  const isSubmitting = registerMutation.isPending;

  const onSubmit = async (values: RegisterPayload): Promise<void> => {
    clearErrors('root.serverError');
    try {
      await registerMutation.mutateAsync(values);
    } catch (error) {
      const { status, message } = getApiError(error);
      if (status === HTTP_STATUS.CONFLICT) {
        setError('email', {
          type: 'server',
          message: message || AUTH_ERROR_MESSAGES.EMAIL_ALREADY_REGISTERED,
        });
      } else {
        setError('root.serverError', {
          type: 'server',
          message: message || AUTH_ERROR_MESSAGES.REGISTRATION_FAILED,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className={formClass}
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        noValidate
        aria-busy={isSubmitting || undefined}
      >
        <FormInput
          name="name"
          label={FORM_LABELS.NAME}
          type="text"
          placeholder={FORM_PLACEHOLDERS.NAME}
          autoComplete="name"
          disabled={isSubmitting}
          required
        />

        <FormInput
          name="email"
          label={FORM_LABELS.EMAIL}
          type="email"
          placeholder={FORM_PLACEHOLDERS.EMAIL}
          autoComplete="username"
          disabled={isSubmitting}
          required
        />

        <FormInput
          name="password"
          label={FORM_LABELS.PASSWORD}
          type="password"
          placeholder={FORM_PLACEHOLDERS.PASSWORD}
          autoComplete="new-password"
          disabled={isSubmitting}
          required
        />

        {errors.root?.serverError?.message && (
          <ErrorBlock>{errors.root.serverError.message}</ErrorBlock>
        )}
        <Button type="submit" disabled={isSubmitting} className={submitButton}>
          {isSubmitting ? <Spinner size={UI_CONSTANTS.SPINNER_SIZE} /> : BUTTON_LABELS.REGISTER}
        </Button>
      </form>
    </FormProvider>
  );
};
