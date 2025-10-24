import { AppRouter } from './AppRouter/AppRouter';
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
