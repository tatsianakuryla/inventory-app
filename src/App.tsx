import { AppRouter } from './appRouter/appRouter';
import { BrowserRouter } from 'react-router-dom';
import { type JSX, useEffect, useState } from 'react';
import { bootstrapAuth } from './api/auth.bootstrap';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient/queryClient';

function App(): JSX.Element {
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    void bootstrapAuth().finally(() => {
      setIsAuthReady(true);
    });
  }, []);

  if (!isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
