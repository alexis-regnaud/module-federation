import React from "react";
const RemoteButton = React.lazy(() => import("remote/components/Button"));
import { ContextTestProvider } from "host/store";
import { FederatedWrapper } from "./FederatedWrapper";

const App = () => (
  <div>
    <h1>Typescript</h1>
    <h2>App Host</h2>
    <ContextTestProvider value={{ value: "test" }}>
      <FederatedWrapper delayed="Loading Button" error="Error load Button">
        <RemoteButton size="large" />
      </FederatedWrapper>
      <br />
      <FederatedWrapper delayed="Loading Button" error="Error load Button">
        <RemoteButton size="small" />
      </FederatedWrapper>
    </ContextTestProvider>
  </div>
);

export default App;
