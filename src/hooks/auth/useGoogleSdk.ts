import { useEffect, useState } from 'react';

export function useGoogleSdk(): {
  ready: boolean;
} {
  const [ready, setReady] = useState<boolean>(Boolean(globalThis.window.google?.accounts?.id));

  useEffect(() => {
    if (ready) return;
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () =>
      setReady(Boolean(globalThis.window.google?.accounts?.id))
    );
    document.head.append(script);
    return () => {
      if (script.parentNode) script.remove();
    };
  }, [ready]);

  return { ready };
}
