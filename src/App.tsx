import { AppRouter } from './appRouter/appRouter';
import { BrowserRouter } from 'react-router-dom';
import { type JSX } from 'react';
import { bootstrapAuth } from './api/auth.bootstrap';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient/queryClient';

function App(): JSX.Element {
  void bootstrapAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
