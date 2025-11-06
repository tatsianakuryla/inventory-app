import type { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { DEFAULT_LOGIN_VALUES, LoginSchema, type LoginValues } from './schemas';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { useLogin } from '../../../hooks/auth/useLogin';
import { getApiError } from '../../../api/helpers/api.helpers';
import { Spinner } from '../../Spinner/Spinner';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';

export const LoginForm = (): JSX.Element => {
  const methods = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { handleSubmit, formState, setError, clearErrors } = methods;
  const { errors } = formState;
  const loginMutation = useLogin();
  const isSubmitting = loginMutation.isPending;
  const onSubmit = async (values: LoginValues): Promise<void> => {
    clearErrors('root.serverError');
    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      const { message } = getApiError(error);
      setError('root.serverError', { type: 'server', message: message || 'Login failed.' });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4"
        onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        noValidate
        aria-busy={isSubmitting || undefined}
      >
        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="username"
          disabled={isSubmitting}
          required
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isSubmitting}
          required
        />
        {errors.root?.serverError?.message && (
          <ErrorBlock>{errors.root.serverError.message}</ErrorBlock>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Spinner size={10} /> : 'Log in'}
        </Button>
      </form>
    </FormProvider>
  );
};
