import React, { createContext, useContext, useState } from 'react';

interface ApiDemoData {
  data: any | null;
  time: number | null;
  dataSize: number | null;
}

interface ApiDemoContextType {
  rest: ApiDemoData;
  setRest: React.Dispatch<React.SetStateAction<ApiDemoData>>;
  graphql: ApiDemoData;
  setGraphql: React.Dispatch<React.SetStateAction<ApiDemoData>>;
}

const defaultDemoData: ApiDemoData = {
  data: null,
  time: null,
  dataSize: null,
};

const ApiDemoContext = createContext<ApiDemoContextType | undefined>(undefined);

export const ApiDemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rest, setRest] = useState<ApiDemoData>(defaultDemoData);
  const [graphql, setGraphql] = useState<ApiDemoData>(defaultDemoData);

  return (
    <ApiDemoContext.Provider value={{ rest, setRest, graphql, setGraphql }}>
      {children}
    </ApiDemoContext.Provider>
  );
};

export function useApiDemo() {
  const ctx = useContext(ApiDemoContext);
  if (!ctx) throw new Error('useApiDemo must be used within ApiDemoProvider');
  return ctx;
} 
