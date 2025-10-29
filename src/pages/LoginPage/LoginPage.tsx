import type { JSX } from 'react';
import { APP_ROUTES } from '../../appRouter/routes/routes';
import { AuthCard } from '../../components/Auth/AuthCard/AuthCard';
import { LoginForm } from '../../components/Auth/LoginForm/LoginForm';
import { AuthSocialButtons } from '../../components/Auth/AuthSocialButton/AuthSocialButton';
import { DividerOr } from '../../components/DividerOr/DividerOr';

export const LoginPage = (): JSX.Element => (
  <>
    <AuthCard
      title="Login"
      redirectionLink={{
        text: 'Don’t have an account?',
        href: APP_ROUTES.REGISTER,
        label: 'Register',
      }}
    >
      <LoginForm />
      <DividerOr label="or" />
      <AuthSocialButtons />
    </AuthCard>
  </>
);
