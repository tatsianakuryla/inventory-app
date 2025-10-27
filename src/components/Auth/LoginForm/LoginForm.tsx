import type { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { DEFAULT_LOGIN_VALUES, LoginSchema, type LoginValues } from './schemas';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { isError } from '../../../shared/typeguards/typeguards';

export const LoginForm = (): JSX.Element => {
  const methods = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: DEFAULT_LOGIN_VALUES,
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { handleSubmit, formState, setError } = methods;
  const { isSubmitting, errors } = formState;

  const onSubmit = async (_data: LoginValues): Promise<void> => {
    try {
      //TODO
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: unknown) {
      const message = isError(error) ? error.message : 'Login failed. Please try again.';
      setError('root.serverError', { type: 'server', message });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4"
        onSubmit={void handleSubmit(onSubmit)}
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
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isSubmitting}
        />

        {errors.root?.serverError?.message && (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert" aria-live="polite">
            {errors.root.serverError.message}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Signing in…' : 'Log in'}
        </Button>
      </form>
    </FormProvider>
  );
};
