import './App.css';
import { AppRouter } from './AppRouter/AppRouter.tsx';
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
