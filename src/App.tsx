import { AppRouter } from './appRouter/appRouter';
import { BrowserRouter } from 'react-router-dom';
import { type JSX } from 'react';
import { bootstrapAuth } from './api/auth.bootstrap';
import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient/queryClient';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App(): JSX.Element {
  useEffect(() => {
    void bootstrapAuth();
  }, []);
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
