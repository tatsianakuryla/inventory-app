declare global {
  interface ImportMetaEnvironment {
    readonly VITE_API_URL: string;
    readonly VITE_GOOGLE_CLIENT_ID: string;
    readonly VITE_FACEBOOK_APP_ID: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnvironment;
  }

  type FBStatus = 'connected' | 'not_authorized' | 'unknown';

  interface FBAuthResponse {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  }

  interface FBLoginStatusResponse {
    status: FBStatus;
    authResponse?: FBAuthResponse | null;
  }

  interface FBLoginOptions {
    scope?: string;
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
  }

  interface FBInitOptions {
    appId: string;
    cookie?: boolean;
    xfbml?: boolean;
    version: string;
  }

  interface FBSDK {
    init(options: FBInitOptions): void;
    getLoginStatus(callback: (response: FBLoginStatusResponse) => void): void;
    login(callback: (response: FBLoginStatusResponse) => void, options?: FBLoginOptions): void;
    logout(callback?: () => void): void;
  }

  interface Window {
    FB?: FBSDK;
    fbAsyncInit?: () => void;
  }

  var FB: FBSDK | undefined;
  var fbAsyncInit: (() => void) | undefined;
}
