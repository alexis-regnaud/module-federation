import React from "react";
const RemoteButton = React.lazy(() => import("remote/components/Button"));
import { ContextTestProvider } from "host/store";

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App Host</h2>
    <ContextTestProvider value={{ value: "test" }}>
      <React.Suspense fallback="Loading Button">
        <RemoteButton size="large" />
        <br />
        <RemoteButton size="small" />
      </React.Suspense>
    </ContextTestProvider>
  </div>
);

export default App;
