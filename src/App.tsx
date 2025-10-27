import { AppRouter } from './app-router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { type JSX } from 'react';
import { bootstrapAuth } from './api/auth.bootstrap';
import { useEffect } from 'react';

function App(): JSX.Element {
  useEffect(() => {
    void bootstrapAuth();
  }, []);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
