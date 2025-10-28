import { useEffect, useState } from 'react';

const SDK_ID = 'facebook-jssdk';
const SDK_SRC = 'https://connect.facebook.net/en_US/sdk.js';

export function useFacebookSdk(): {
  ready: boolean;
  FB: typeof globalThis.window.FB | undefined;
} {
  const hasWindow = globalThis.window !== undefined;

  const [ready, setReady] = useState<boolean>(hasWindow && !!globalThis.window.FB);

  useEffect(() => {
    if (!hasWindow) return;
    const window = globalThis.window;
    if (window.FB) {
      setReady(true);
      return;
    }
    window.fbAsyncInit = () => {
      window.FB?.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: false,
        version: 'v19.0',
      });
      setReady(true);
    };
    if (document.querySelector(`#${SDK_ID}`)) return;
    const script = document.createElement('script');
    script.id = SDK_ID;
    script.src = SDK_SRC;
    script.async = true;
    document.body.append(script);
  }, [hasWindow]);
  return {
    ready,
    FB: hasWindow ? globalThis.window.FB : undefined,
  };
}
