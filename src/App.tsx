import { AppRouter } from './AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { type JSX } from 'react';
import { THEMES } from './shared/types/main.types';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRouter theme={THEMES.LIGHT} />
    </BrowserRouter>
  );
}

export default App;
