import { type JSX, useState } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { Button } from '../../../Button/Button';
import { ErrorBlock } from '../../../ErrorBlock/ErrorBlock';
import { useGoogleLogin } from '../../../../hooks/auth/useGoogleLogin';
import { getApiError } from '../../../../api/helpers/api.helpers';
import { Mail } from 'lucide-react';
import {
  container,
  buttonWrapper,
  button,
  sdkWrapper,
  sdkHidden,
} from './google-auth-button.styles';

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
    <div className={container}>
      <div className={buttonWrapper}>
        <Button
          type="button"
          variant="secondary"
          className={button}
          onClick={(event) => event.preventDefault()}
        >
          <Mail />
          Continue with Google
        </Button>
        <div className={sdkWrapper}>
          <div className={sdkHidden}>
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
      {errorText && <ErrorBlock>{errorText}</ErrorBlock>}
    </div>
  );
}
