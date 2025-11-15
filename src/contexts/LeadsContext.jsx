import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const LeadsContext = createContext();

export default function useLeads() {
  return useContext(LeadsContext);
}

export function LeadsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramStatus = searchParams.get("status") || "";
  const paramSalesAgent = searchParams.get("agent") || "";

  // leads related state var's
  const [leads, setLeads] = useState(null);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsErr, setLeadsErr] = useState(null);

  // filtering related state var's
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

  const params = useMemo(
    () => ({
      status: statusFilter,
      salesAgent: salesAgentFilter,
    }),
    [statusFilter, salesAgentFilter]
  );

  async function fetchLeads(params = null) {
    try {
      setLeads(null);
      setLeadsLoading(true);
      const response = await axios.get(
        "https://backend-covalent-sales.vercel.app/leads",
        { params: params }
      );
      setLeads(response.data);
      setLeadsErr(null);
    } catch (err) {
      setLeadsErr(err.response.data.error);
    } finally {
      setLeadsLoading(false);
    }
  }

  useEffect(() => {
    fetchLeads(params);
    console.log(params);
  }, [params]);

  return (
    <LeadsContext.Provider
      value={{
        leads: leads || [],
        leadsLoading: leadsLoading,
        leadsErr: leadsErr,
        statusFilter: statusFilter,
        salesAgentFilter: salesAgentFilter,
        setStatusFilter: updateStatusFilter,
        setSalesAgentFilter: updateSalesAgentFilter,
        fetchLeads: fetchLeads,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
