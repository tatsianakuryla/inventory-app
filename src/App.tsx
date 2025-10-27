import { AppRouter } from './app-router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { type JSX } from 'react';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
