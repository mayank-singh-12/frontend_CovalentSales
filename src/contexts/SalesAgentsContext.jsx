import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const SalesAgentContext = createContext();

export default function useSalesAgent() {
  return useContext(SalesAgentContext);
}

export function SalesAgentProvider({ children }) {
  // for multiple agents
  const [agents, setAgents] = useState(null);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agentsErr, setAgentsErr] = useState(null);

  // for single agent
  const [agent, setAgent] = useState(null);
  const [agentLoading, setAgentLoading] = useState(true);
  const [agentErr, setAgentErr] = useState(null);

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
      // setAgentsLoading(false);
      setAgentsErr(null);
      setAgents(response.data);
    } catch (err) {
      // console.log(err)
      setAgentsErr(err.response.data.error);
    } finally {
      setAgentsLoading(false);
    }
  }

  async function fetchAgentById(agentId) {
    setAgentLoading(true);
    setAgent(null);
    try {
      const response = await axios.get(
        `https://backend-covalent-sales.vercel.app/agents/${agentId}`
      );
      setAgentErr(null);
      setAgent(response.data);
    } catch (err) {
      setAgentErr(err.response.data.error);
    } finally {
      setAgentLoading(false);
    }
  }

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <>
      <SalesAgentContext.Provider
        value={{
          // all agents
          salesAgents: agents || [],
          salesAgentsLoading: agentsLoading,
          salesAgentsErr: agentsErr,
          fetchAgents: fetchAgents,

          // single agent
          salesAgent: agent || [],
          salesAgentLoading: agentLoading,
          salesAgentErr: agentErr,
          fetchAgentById: fetchAgentById,
        }}
      >
        {children}
      </SalesAgentContext.Provider>
    </>
  );
}
