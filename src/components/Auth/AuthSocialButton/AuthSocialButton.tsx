import type { JSX } from 'react';
import { ButtonLink } from '../../Button/ButtonLink';
import { Facebook, Mail } from 'lucide-react';

export function AuthSocialButtons(): JSX.Element {
  return (
    <div className="space-y-3">
      <ButtonLink
        href={'#'}
        variant="secondary"
        className="inline-flex w-full items-center justify-center gap-2"
      >
        <Mail className="h-4 w-4" aria-hidden />
        Continue with Google
      </ButtonLink>
      <ButtonLink
        href={'#'}
        variant="secondary"
        className="inline-flex w-full items-center justify-center gap-2"
      >
        <Facebook className="h-4 w-4" aria-hidden />
        Continue with Facebook
      </ButtonLink>
    </div>
  );
}
