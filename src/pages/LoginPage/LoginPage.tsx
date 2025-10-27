import type { JSX } from 'react';
import { APP_ROUTES } from '../../AppRouter/routes/routes';
import { AuthCard } from '../../components/Auth/AuthCard/AuthCard';
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm';

export const LoginPage = (): JSX.Element => (
  <AuthCard
    title="Login"
    redirectionLink={{
      text: 'Don’t have an account?',
      href: APP_ROUTES.REGISTER,
      label: 'Register',
    }}
  >
    <LoginForm />
  </AuthCard>
);
