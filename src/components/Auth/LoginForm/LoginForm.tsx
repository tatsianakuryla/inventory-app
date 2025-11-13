import type { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginPayloadSchema, type LoginPayload } from '../../../api/AuthService/auth.schemas';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { useLogin } from '../../../hooks/auth/useLogin';
import { getApiError } from '../../../api/helpers/api.helpers';
import { Spinner } from '../../Spinner/Spinner';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';
import {
  AUTH_ERROR_MESSAGES,
  FORM_LABELS,
  FORM_PLACEHOLDERS,
  BUTTON_LABELS,
} from '../../../shared/constants/messages';
import { UI_CONSTANTS } from '../../../shared/constants/validation';
import { formClass, submitButton } from './login-form.styles';

const DEFAULT_LOGIN_VALUES: LoginPayload = { email: '', password: '' };

export const LoginForm = (): JSX.Element => {
  const methods = useForm<LoginPayload>({
    resolver: zodResolver(LoginPayloadSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { handleSubmit, formState, setError, clearErrors } = methods;
  const { errors } = formState;
  const loginMutation = useLogin();
  const isSubmitting = loginMutation.isPending;
  const onSubmit = async (values: LoginPayload): Promise<void> => {
    clearErrors('root.serverError');
    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      const { message } = getApiError(error);
      setError('root.serverError', {
        type: 'server',
        message: message || AUTH_ERROR_MESSAGES.LOGIN_FAILED,
      });
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
          autoComplete="current-password"
          disabled={isSubmitting}
          required
        />
        {errors.root?.serverError?.message && (
          <ErrorBlock>{errors.root.serverError.message}</ErrorBlock>
        )}
        <Button type="submit" disabled={isSubmitting} className={submitButton}>
          {isSubmitting ? <Spinner size={UI_CONSTANTS.SPINNER_SIZE} /> : BUTTON_LABELS.LOGIN}
        </Button>
      </form>
    </FormProvider>
  );
};
