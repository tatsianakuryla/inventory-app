export function getGoogleIdToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    const googleId = globalThis.window.google?.accounts?.id;
    if (!googleId) {
      reject(new Error('Google SDK is not ready'));
      return;
    }
    let settled = false;
    googleId.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: (response) => {
        if (settled) return;
        settled = true;
        if (response && typeof response.credential === 'string' && response.credential) {
          resolve(response.credential);
        } else {
          reject(new Error('Google login was cancelled or failed.'));
        }
      },
    });
    googleId.prompt((n) => {
      if (settled) return;
      const cancelled = Boolean(n?.isNotDisplayed?.() || n?.isSkippedMoment?.());
      if (cancelled) {
        settled = true;
        reject(new Error('Google login was cancelled.'));
      }
    });
  });
}
