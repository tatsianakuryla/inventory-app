import type { JSX } from 'react';
import { GoogleAuthButton } from './GoogleAuthButton/GoogleAuthButton';
import { FacebookAuthButton } from './FacebookAuthButton/FacebookAuthButton';
import { container } from './auth-social-button.styles';

export function AuthSocialButtons(): JSX.Element {
  return (
    <div className={container}>
      <GoogleAuthButton />
      <FacebookAuthButton />
    </div>
  );
}
