import React from "react";

import LocalButton from "./components/Button";
import { useContextTest } from "host/store";

const App = () => {
  const { value } = useContextTest();
  console.log("value", value);
  return (
    <div>
      <h1>Typescript</h1>
      <h2>App Remote</h2>
      <LocalButton size="small" />
    </div>
  );
};

export default App;
