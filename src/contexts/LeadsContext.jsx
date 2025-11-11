import { createContext, useContext, useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";

const LeadsContext = createContext();

export default function useLeads() {
  return useContext(LeadsContext);
}

export function LeadsProvider({ children }) {
  const [statusFilter, setStatusFilter] = useState("");
  const [salesAgentFilter, setSalesAgentFilter] = useState("");

  const params = useMemo(
    () => ({
      status: statusFilter,
      salesAgent: salesAgentFilter,
    }),
    [statusFilter, salesAgentFilter]
  );

  const { data, loading, error } = useFetch(
    `http://localhost:8080/leads`,
    params
  );

  return (
    <LeadsContext.Provider
      value={{
        leads: data || [],
        leadsLoading: loading,
        leadsErr: error,
        setStatusFilter,
        setSalesAgentFilter,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
