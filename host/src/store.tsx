import React from "react";

interface ContextParams {
  value: string;
}
const ContextText = React.createContext<ContextParams | undefined>(undefined);

interface ContextTestProviderProps {
  children: React.ReactNode;
  value: {
    value: ContextParams["value"];
  };
}
function ContextTestProvider({ children, value }: ContextTestProviderProps) {
  return <ContextText.Provider value={value}>{children}</ContextText.Provider>;
}

function useContextTest(): ContextParams {
  const context = React.useContext(ContextText);
  if (context === undefined) {
    throw new Error(
      "SelectContext must be used within a SelectContext.Provider"
    );
  }
  return context;
}

export { ContextTestProvider, useContextTest };
