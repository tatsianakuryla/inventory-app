import { Facebook } from 'lucide-react';
import { type JSX, useMemo, useState } from 'react';
import { Login } from 'react-facebook';
import { Button } from '../../../Button/Button';
import { useFacebookLogin } from '../../../../hooks/auth/useFacebookLogin';
import { ServerError } from '../../../ServerError/ServerError';
import { isError } from '../../../../shared/typeguards/typeguards';
import { FbCompletedSchema } from '../../../../api/types/api.schemas';

export function FacebookAuthButton(): JSX.Element {
  const [errorText, setErrorText] = useState<string>();
  const mutation = useFacebookLogin();
  const busy = useMemo(() => mutation.isPending, [mutation.isPending]);
  return (
    <div className="space-y-2">
      <Login
        scope="public_profile,email"
        onCompleted={(response: unknown) => {
          setErrorText(undefined);
          const parsed = FbCompletedSchema.safeParse(response);
          if (!parsed.success) {
            setErrorText('Facebook login was cancelled or failed.');
            return;
          }
          mutation.mutate(parsed.data.authResponse.accessToken, {
            onError: (error) => {
              const message = isError(error) ? error.message : String(error);
              setErrorText(message || 'Facebook authentication failed. Please try again.');
            },
          });
        }}
        onError={(error: unknown) => {
          const message = isError(error) ? error.message : String(error);
          setErrorText(message || 'Facebook login failed. Please try again.');
        }}
      >
        {({ isLoading, onClick }) => {
          const disabled = isLoading || busy;
          return (
            <Button
              type="button"
              onClick={onClick}
              disabled={disabled}
              aria-busy={disabled || undefined}
              variant="secondary"
              className="inline-flex w-full items-center justify-center gap-2"
            >
              <Facebook className="h-4 w-4" aria-hidden />
              Continue with Facebook
            </Button>
          );
        }}
      </Login>
      {errorText && <ServerError>{errorText}</ServerError>}
    </div>
  );
}
