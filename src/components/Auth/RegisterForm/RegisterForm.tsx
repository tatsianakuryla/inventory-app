import type { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { type RegisterValues, DEFAULT_REGISTER_VALUES, RegisterSchema } from './schemas';
import { isError } from '../../../shared/typeguards/typeguards';

export const RegisterForm = (): JSX.Element => {
  const methods = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: DEFAULT_REGISTER_VALUES,
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { handleSubmit, formState, setError } = methods;

  const onSubmit = async (_data: RegisterValues): Promise<void> => {
    try {
      //TODO
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: unknown) {
      const message = isError(error) ? error.message : 'Registration failed. Please try again.';
      setError('root.serverError', { type: 'server', message });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-4"
        onSubmit={void handleSubmit(onSubmit)}
        noValidate
        aria-busy={formState.isSubmitting || undefined}
      >
        <FormInput
          name="name"
          label="Name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          disabled={formState.isSubmitting}
        />

        <FormInput
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          autoComplete="username"
          disabled={formState.isSubmitting}
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          disabled={formState.isSubmitting}
        />

        {methods.formState.errors.root?.serverError?.message && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {methods.formState.errors.root.serverError.message}
          </p>
        )}

        <Button type="submit" disabled={formState.isSubmitting} className="w-full">
          {formState.isSubmitting ? 'Signing up…' : 'Register'}
        </Button>
      </form>
    </FormProvider>
  );
};
