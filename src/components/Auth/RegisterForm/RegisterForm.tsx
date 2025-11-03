import type { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { FormInput } from '../../FormInput/FormInput';
import { Button } from '../../Button/Button';
import { type RegisterValues, DEFAULT_REGISTER_VALUES, RegisterSchema } from './schemas';
import { getApiError } from '../../../api/helpers/api.helpers';
import { useRegister } from '../../../hooks/auth/useRegister';
import { Spinner } from '../../Spinner/Spinner';
import { ErrorBlock } from '../../ErrorBlock/ErrorBlock';

export const RegisterForm = (): JSX.Element => {
  const methods = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: DEFAULT_REGISTER_VALUES,
    mode: 'onBlur',
    shouldFocusError: true,
  });

  const { handleSubmit, formState, setError, clearErrors } = methods;
  const { errors } = formState;
  const registerMutation = useRegister();
  const isSubmitting = registerMutation.isPending;

  const onSubmit = async (values: RegisterValues): Promise<void> => {
    clearErrors('root.serverError');
    try {
      await registerMutation.mutateAsync(values);
    } catch (error) {
      const { status, message } = getApiError(error);
      if (status === 409) {
        setError('email', { type: 'server', message: message || 'Email is already registered.' });
      } else {
        setError('root.serverError', {
          type: 'server',
          message: message || 'Registration failed. Please try again.',
        });
      }
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
          name="name"
          label="Name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          disabled={isSubmitting}
        />

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
          autoComplete="new-password"
          disabled={isSubmitting}
        />

        {errors.root?.serverError?.message && (
          <ErrorBlock>{errors.root.serverError.message}</ErrorBlock>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? <Spinner size={10} /> : 'Register'}
        </Button>
      </form>
    </FormProvider>
  );
};
