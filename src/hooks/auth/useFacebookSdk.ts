import { useEffect, useRef, useState } from 'react';

const SDK_ID = 'facebook-jssdk';
const SDK_SRC = 'https://connect.facebook.net/en_US/sdk.js';

export function useFacebookSdk(): {
  ready: boolean;
  FB: typeof globalThis.window.FB | undefined;
} {
  const window = globalThis.window;
  const hasWindow = window !== undefined;
  const [ready, setReady] = useState<boolean>(hasWindow && !!window.FB);
  const initializedReference = useRef(false);

  useEffect(() => {
    if (!hasWindow) return;
    if (window.FB) {
      setReady(true);
      return;
    }

    if (initializedReference.current) return;
    initializedReference.current = true;

    const previousFbAsyncInit = window.fbAsyncInit;

    window.fbAsyncInit = () => {
      try {
        window.FB?.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: false,
          version: 'v19.0',
        });
      } finally {
        setReady(!!window.FB);
        if (typeof previousFbAsyncInit === 'function') {
          try {
            previousFbAsyncInit();
          } catch {
            console.error('Failed to call previous fbAsyncInit');
          }
        }
      }
    };
    if (document.querySelector(`#${SDK_ID}`)) return;

    const script = document.createElement('script');
    script.id = SDK_ID;
    script.src = SDK_SRC;
    script.async = true;
    script.addEventListener('onerror', () => {
      setReady(false);
    });
    document.body.append(script);
  }, [hasWindow, window]);

  return { ready, FB: hasWindow ? window.FB : undefined };
}
