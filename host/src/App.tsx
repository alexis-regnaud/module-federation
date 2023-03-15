import React from 'react';
const RemoteButton = React.lazy(() => import('remote/components/Button'));

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App Host</h2>
    <React.Suspense fallback="Loading Button">
      <RemoteButton size="large" />
      <br />
      <RemoteButton size="small" />
    </React.Suspense>
  </div>
);

export default App;
