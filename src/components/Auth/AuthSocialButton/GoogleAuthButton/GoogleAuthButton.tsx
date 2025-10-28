import { Mail } from 'lucide-react';
import { type JSX, useCallback, useMemo, useState } from 'react';
import { Button } from '../../../Button/Button';
import { useGoogleSdk } from '../../../../hooks/auth/useGoogleSdk';
import { useGoogleLogin } from '../../../../hooks/auth/useGoogleLogin';
import { getApiError } from '../../../../api/helpers/api.helpers';
import { ServerError } from '../../../ServerError/ServerError';

export function GoogleAuthButton(): JSX.Element {
  const { ready } = useGoogleSdk();
  const googleLogin = useGoogleLogin();
  const [errorText, setErrorText] = useState<string | undefined>();

  const handleGoogleLogin = useCallback(() => {
    setErrorText(undefined);
    void googleLogin.mutateAsync().catch((error) => {
      const { message } = getApiError(error);
      setErrorText(message || 'Google login failed. Please try again.');
    });
  }, [googleLogin]);

  const disabled = useMemo(() => !ready || googleLogin.isPending, [ready, googleLogin.isPending]);

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleGoogleLogin}
        disabled={disabled}
        variant="secondary"
        className="inline-flex w-full items-center justify-center gap-2"
        aria-busy={googleLogin.isPending || undefined}
      >
        <Mail className="h-4 w-4" aria-hidden />
        Continue with Google
      </Button>
      {errorText && <ServerError>{errorText}</ServerError>}
    </div>
  );
}
