import { createContext, useContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

const SalesAgentContext = createContext();

export default function useSalesAgent() {
  return useContext(SalesAgentContext);
}

export function SalesAgentProvider({ children }) {
  const { data, loading, error } = useFetch("http://localhost:8080/agents");

  return (
    <>
      <SalesAgentContext.Provider
        value={{
          salesAgents: data || [],
          salesAgentsLoading: loading,
          saleAgentsErr: error,
        }}
      >
        {children}
      </SalesAgentContext.Provider>
    </>
  );
}
