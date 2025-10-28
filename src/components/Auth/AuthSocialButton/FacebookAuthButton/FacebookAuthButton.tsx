import { Facebook } from 'lucide-react';
import { type JSX, useCallback, useMemo, useState } from 'react';
import { Button } from '../../../Button/Button';
import { useFacebookLogin } from '../../../../hooks/auth/useFacebookLogin';
import { useFacebookSdk } from '../../../../hooks/auth/useFacebookSdk';
import { getApiError } from '../../../../api/helpers/api.helpers';
import { ServerError } from '../../../ServerError/ServerError';

export const FacebookAuthButton = (): JSX.Element => {
  const { ready } = useFacebookSdk();
  const facebookLoginMutation = useFacebookLogin();
  const [errorText, setErrorText] = useState<string | undefined>();
  const handleFacebookLogin = useCallback(() => {
    setErrorText(undefined);

    if (!ready || facebookLoginMutation.isPending) return;

    const fb = globalThis.window.FB;
    if (!fb) {
      setErrorText('Facebook SDK not loaded. Please try again.');
      return;
    }

    fb.login(
      (response: FbAuthResponse) => {
        const token = response.authResponse?.accessToken;
        if (response.status !== 'connected' || !token) {
          setErrorText('Facebook login was cancelled or failed.');
          return;
        }

        facebookLoginMutation.mutate(token, {
          onError: (error) => {
            const { message } = getApiError(error);
            if (message === 'Facebook email not granted') {
              setErrorText(
                'We could not get your email from Facebook. Please allow email permission and try again.'
              );
            } else if (message === 'Facebook auth failed') {
              setErrorText('Facebook authentication failed. Please try again.');
            } else {
              setErrorText(message || 'Facebook login failed. Please try again.');
            }
          },
        });
      },
      { scope: 'public_profile,email', return_scopes: true }
    );
  }, [ready, facebookLoginMutation]);

  const disabled = useMemo(
    () => !ready || facebookLoginMutation.isPending,
    [ready, facebookLoginMutation.isPending]
  );

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleFacebookLogin}
        disabled={disabled}
        variant="secondary"
        className="inline-flex w-full items-center justify-center gap-2"
        aria-busy={facebookLoginMutation.isPending || undefined}
      >
        <Facebook className="h-4 w-4" aria-hidden />
        Continue with Facebook
      </Button>
      {errorText && <ServerError>{errorText}</ServerError>}
    </div>
  );
};
