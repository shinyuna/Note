import { useState } from 'react';

import viteLogo from '/vite.svg';
import AppProvider from './AppProvider';

import './App.css';
import { Button } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0);

  return (
    <AppProvider>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </AppProvider>
  );
}

export default App;
