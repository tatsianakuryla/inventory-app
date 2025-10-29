import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { FacebookProvider } from 'react-facebook';

const root = document.querySelector('#root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <FacebookProvider appId={import.meta.env.VITE_FACEBOOK_APP_ID}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </FacebookProvider>
    </StrictMode>
  );
}
