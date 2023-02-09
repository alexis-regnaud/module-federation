import * as React from 'react';
import NxWelcome from './nx-welcome';
import { Link, Route, Routes } from 'react-router-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';

const Module1 = React.lazy(() => import('module1/Module'));
const Module2 = React.lazy(() => import('module2/Module'));

export function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <React.Suspense fallback={null}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/module1">Module1</Link>
            </li>

            <li>
              <Link to="/module2">Module2</Link>
            </li>
          </ul>
          <Routes>
            <Route path="/" element={<NxWelcome title="host" />} />

            <Route path="/module1" element={<Module1 />} />

            <Route path="/module2" element={<Module2 />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
