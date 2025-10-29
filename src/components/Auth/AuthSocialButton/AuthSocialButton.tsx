import type { JSX } from 'react';
import { GoogleAuthButton } from './GoogleAuthButton/GoogleAuthButton';
import { FacebookAuthButton } from './FacebookAuthButton/FacebookAuthButton';

export function AuthSocialButtons(): JSX.Element {
  return (
    <div className="align-center flex flex-col justify-center space-y-3">
      <GoogleAuthButton />
      <FacebookAuthButton />
    </div>
  );
}
