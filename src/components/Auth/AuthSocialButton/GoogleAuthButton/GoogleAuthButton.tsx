import { type JSX, useState } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { Button } from '../../../Button/Button';
import { ServerError } from '../../../ServerError/ServerError';
import { useGoogleLogin } from '../../../../hooks/auth/useGoogleLogin';
import { getApiError } from '../../../../api/helpers/api.helpers';
import { Mail } from 'lucide-react';

export function GoogleAuthButton(): JSX.Element {
  const [errorText, setErrorText] = useState<string>();
  const googleLogin = useGoogleLogin();

  const handleSuccess = async (response: CredentialResponse): Promise<void> => {
    setErrorText(undefined);
    const idToken = response.credential;
    if (!idToken) {
      setErrorText('Google returned an empty token.');
      return;
    }
    try {
      await googleLogin.mutateAsync(idToken);
    } catch (error) {
      const { message } = getApiError(error);
      setErrorText(message || 'Google login failed. Please try again.');
    }
  };
  return (
    <div className="space-y-2">
      <div className="relative">
        <Button
          type="button"
          variant="secondary"
          className="inline-flex w-full items-center justify-center gap-2 select-none"
          onClick={(event) => event.preventDefault()}
        >
          <Mail />
          Continue with Google
        </Button>
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center">
          <div className="opacity-0">
            <GoogleLogin
              locale="en"
              useOneTap={false}
              onSuccess={(response) => {
                void handleSuccess(response);
              }}
              onError={() => setErrorText('Google login failed.')}
            />
          </div>
        </div>
      </div>
      {errorText && <ServerError>{errorText}</ServerError>}
    </div>
  );
}
