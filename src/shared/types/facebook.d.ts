export declare global {
  type FbLoginStatus = 'connected' | 'not_authorized' | 'unknown';

  interface FbAuthResponsePayload {
    accessToken?: string;
    expiresIn?: number;
    reauthorize_required_in?: number;
    signedRequest?: string;
    userID?: string;
  }

  interface FbAuthResponse {
    status: FbLoginStatus;
    authResponse?: FbAuthResponsePayload;
  }

  interface FbLoginOptions {
    scope?: string;
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
  }

  interface FacebookSdk {
    init(options: { appId: string; cookie?: boolean; xfbml?: boolean; version: string }): void;
    login(callback: (response: FbAuthResponse) => void, options?: FbLoginOptions): void;
    getAuthResponse?(): FbAuthResponsePayload | null;
  }

  interface Window {
    FB?: FacebookSdk;
    fbAsyncInit?: () => void;
  }
}
