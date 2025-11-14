import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const SalesAgentContext = createContext();

export default function useSalesAgent() {
  return useContext(SalesAgentContext);
}

export function SalesAgentProvider({ children }) {
  const [agents, setAgents] = useState(null);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agentsErr, setAgentsErr] = useState(null);

  async function fetchAgents() {
    // const { data, loading, error } = useFetch(
    //   "https://backend-covalent-sales.vercel.app/agents"
    // );
    setAgents(null);
    setAgentsLoading(true);
    try {
      const response = await axios.get(
        "https://backend-covalent-sales.vercel.app/agents"
      );
      setAgentsLoading(false);
      setAgentsErr(null);
      setAgents(response.data);
    } catch (err) {
      // console.log(err)
      setAgentsErr(err.response.data.error);
    } finally {
      setAgentsLoading(false);
    }
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <>
      <SalesAgentContext.Provider
        value={{
          salesAgents: agents || [],
          salesAgentsLoading: agentsLoading,
          salesAgentsErr: agentsErr,
          fetchAgents: fetchAgents,
        }}
      >
        {children}
      </SalesAgentContext.Provider>
    </>
  );
}
