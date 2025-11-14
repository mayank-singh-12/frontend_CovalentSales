import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const LeadsContext = createContext();

export default function useLeads() {
  return useContext(LeadsContext);
}

export function LeadsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramStatus = searchParams.get("status") || "";
  const paramSalesAgent = searchParams.get("agent") || "";

  const [statusFilter, setStatusFilter] = useState(paramStatus);
  const [salesAgentFilter, setSalesAgentFilter] = useState(paramSalesAgent);

  useEffect(() => {
    if (statusFilter !== paramStatus) setStatusFilter(paramStatus);
    if (salesAgentFilter !== paramSalesAgent)
      setSalesAgentFilter(paramSalesAgent);
  }, [searchParams]);

  function updateSearchParams(filterKey, filterValue) {
    const sp = new URLSearchParams(searchParams);
    if (filterValue !== "") {
      sp.set(filterKey, filterValue);
    } else {
      sp.delete(filterKey);
    }
    setSearchParams(sp);
  }

  function updateStatusFilter(status) {
    setStatusFilter(status);
    updateSearchParams("status", status);
  }

  function updateSalesAgentFilter(agent) {
    setSalesAgentFilter(agent);
    updateSearchParams("agent", agent);
  }

  // function

  const params = useMemo(
    () => ({
      status: statusFilter,
      salesAgent: salesAgentFilter,
    }),
    [statusFilter, salesAgentFilter]
  );

  const { data, loading, error } = useFetch(
    `https://backend-covalent-sales.vercel.app/leads`,
    params
  );

  return (
    <LeadsContext.Provider
      value={{
        leads: data || [],
        leadsLoading: loading,
        leadsErr: error,
        setStatusFilter: updateStatusFilter,
        setSalesAgentFilter: updateSalesAgentFilter,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
