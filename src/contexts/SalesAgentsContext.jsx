import { createContext, useContext } from "react";
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
          salesAgentsErr: error,
        }}
      >
        {children}
      </SalesAgentContext.Provider>
    </>
  );
}
