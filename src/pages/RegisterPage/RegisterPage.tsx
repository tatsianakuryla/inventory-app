import type { JSX } from 'react';
import { APP_ROUTES } from '../../app-router/routes/routes';
import { AuthCard } from '../../components/Auth/AuthCard/AuthCard';
import { RegisterForm } from '../../components/Auth/RegisterForm/RegisterForm';
import { DividerOr } from '../../components/DividerOr/DividerOr';
import { AuthSocialButtons } from '../../components/Auth/AuthSocialButton/AuthSocialButton';

export const RegisterPage = (): JSX.Element => (
  <AuthCard
    title="Registration"
    redirectionLink={{
      text: 'Already have an account?',
      href: APP_ROUTES.LOGIN,
      label: 'Log in',
    }}
  >
    <RegisterForm />
    <DividerOr label="or continue with email" />
    <AuthSocialButtons />
  </AuthCard>
);
