import { Facebook } from 'lucide-react';
import { type JSX, useState, useCallback } from 'react';
import { Button } from '../../../Button/Button';
import { useFacebookLogin } from '../../../../hooks/auth/useFacebookLogin';
import { ErrorBlock } from '../../../ErrorBlock/ErrorBlock';
import { isError } from '../../../../shared/typeguards/typeguards';
import { container, button, iconSize } from './facebook-auth-button.styles';

let fbSdkLoaded = false;
let fbSdkLoading = false;

const getFB = (): FBSDK | undefined => globalThis.FB;

export function FacebookAuthButton(): JSX.Element {
  const [errorText, setErrorText] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useFacebookLogin();

  const loadFacebookSDK = useCallback((): Promise<FBSDK> => {
    return new Promise<FBSDK>((resolve) => {
      const fbExisting = getFB();
      if (fbSdkLoaded && fbExisting) {
        resolve(fbExisting);
        return;
      }

      if (fbSdkLoading) {
        const checkInterval = setInterval(() => {
          const fbCheck = getFB();
          if (fbSdkLoaded && fbCheck) {
            clearInterval(checkInterval);
            resolve(fbCheck);
          }
        }, 100);
        return;
      }

      fbSdkLoading = true;

      globalThis.fbAsyncInit = function () {
        const fb = getFB();
        if (fb) {
          fb.init({
            appId: import.meta.env.VITE_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: true,
            version: 'v23.0',
          });
          fbSdkLoaded = true;
          fbSdkLoading = false;
          resolve(fb);
        }
      };

      if (!document.querySelector('#facebook-jssdk')) {
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        document.body.append(script);
      }
    });
  }, []);

  const handleLogin = useCallback(() => {
    if (isLoading || mutation.isPending) return;

    setIsLoading(true);
    setErrorText(undefined);

    loadFacebookSDK()
      .then((fb) => {
        if (!fb) {
          setErrorText('Failed to load Facebook SDK.');
          setIsLoading(false);
          return;
        }

        fb.login(
          (response: FBLoginStatusResponse) => {
            if (response.status === 'connected' && response.authResponse?.accessToken) {
              const accessToken = response.authResponse.accessToken;

              mutation.mutate(accessToken, {
                onError: (error) => {
                  const message = isError(error) ? error.message : String(error);
                  setErrorText(message || 'Facebook authentication failed. Please try again.');
                  setIsLoading(false);
                },
                onSuccess: () => {
                  getFB()?.logout?.();
                },
                onSettled: () => {
                  setIsLoading(false);
                },
              });
            } else {
              setErrorText('Facebook login was cancelled or failed.');
              setIsLoading(false);
            }
          },
          { scope: 'public_profile,email' }
        );
      })
      .catch((error: unknown) => {
        const message = isError(error) ? error.message : String(error);
        setErrorText(message || 'Failed to initialize Facebook login.');
        setIsLoading(false);
      });
  }, [loadFacebookSDK, mutation, isLoading]);

  const disabled = isLoading || mutation.isPending;

  return (
    <div className={container}>
      <Button
        type="button"
        onClick={handleLogin}
        disabled={disabled}
        aria-busy={disabled || undefined}
        variant="secondary"
        className={button}
      >
        <Facebook className={iconSize} aria-hidden />
        Continue with Facebook
      </Button>
      {errorText && <ErrorBlock>{errorText}</ErrorBlock>}
    </div>
  );
}
