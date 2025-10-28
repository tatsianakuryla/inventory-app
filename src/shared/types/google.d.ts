export declare global {
  interface GoogleCredentialResponse {
    credential?: string;
  }
  interface GoogleIdInitializeOptions {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }
  interface GoogleIdPromptNotification {
    isNotDisplayed?: () => boolean;
    isSkippedMoment?: () => boolean;
  }
  interface GoogleId {
    initialize: (options: GoogleIdInitializeOptions) => void;
    prompt: (callback?: (n: GoogleIdPromptNotification) => void) => void;
  }
  interface GoogleAccounts {
    id?: GoogleId;
  }
  interface GoogleNamespace {
    accounts?: GoogleAccounts;
  }
  interface Window {
    google?: GoogleNamespace;
  }
}
