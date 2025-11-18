import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const LeadsContext = createContext();

export default function useLeads() {
  return useContext(LeadsContext);
}

export function LeadsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // leads related state var's
  const [leads, setLeads] = useState(null);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [leadsErr, setLeadsErr] = useState(null);

  // extracting values from params
  const paramStatus = searchParams.get("status") || "";
  const paramSalesAgent = searchParams.get("agent") || "";
  const paramPriority = searchParams.get("priority") || "";

  // filtering related state var's
  const [statusFilter, setStatusFilter] = useState(paramStatus);
  const [salesAgentFilter, setSalesAgentFilter] = useState(paramSalesAgent);
  const [priorityFilter, setPriorityFilter] = useState(paramPriority);

  // sorting related state var's
  const [timeToCloseSort, setTimeToCloseSort] = useState("");
  const [prioritySort, setPrioritySort] = useState("");

  useEffect(() => {
    if (statusFilter !== paramStatus) setStatusFilter(paramStatus);
    if (salesAgentFilter !== paramSalesAgent)
      setSalesAgentFilter(paramSalesAgent);
    if (priorityFilter !== paramPriority) setPriorityFilter(paramPriority);
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

  function updatePriority(priority) {
    setPriorityFilter(priority);
    updateSearchParams("priority", priority);
  }

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

  const params = useMemo(
    () => ({
      status: statusFilter,
      salesAgent: salesAgentFilter,
      priority: priorityFilter,
    }),
    [statusFilter, salesAgentFilter, priorityFilter]
  );

  useEffect(() => {
    fetchLeads(params);
    console.log(params);
  }, [params]);

  const priorityArr = ["Low", "Medium", "High"];

  // index of obj signifies presidence of sort field.
  const sortConfig = [];
  if (prioritySort !== "") {
    sortConfig.push({ key: "priority", direction: prioritySort });
  }
  if (timeToCloseSort !== "") {
    sortConfig.push({ key: "timeToClose", direction: timeToCloseSort });
  }

  function multiSort(arr, sortConfig) {
    return arr.toSorted((a, b) => {
      for (const { key, direction } of sortConfig) {
        const order = direction === "asc" ? 1 : -1;
        if (a[key] !== b[key]) {
          if (key === "priority") {
            return (
              order *
              (priorityArr.indexOf(a[key]) - priorityArr.indexOf(b[key]))
            );
          }
          return order * (a[key] - b[key]);
        }
      }
      return 0;
    });
  }

  let sortedLeads = leads && multiSort(leads, sortConfig);

  return (
    <LeadsContext.Provider
      value={{
        leads: leads,
        leadsLoading: leadsLoading,
        leadsErr: leadsErr,

        // filters
        statusFilter: statusFilter,
        salesAgentFilter: salesAgentFilter,
        priorityFilter: priorityFilter,

        // sort
        sortedLeads: sortedLeads,
        timeToCloseSort: timeToCloseSort,
        prioritySort: prioritySort,

        // set filters
        setStatusFilter: updateStatusFilter,
        setSalesAgentFilter: updateSalesAgentFilter,
        setPriorityFilter: updatePriority,

        // set sort
        setTimeToCloseSort: setTimeToCloseSort,
        setPrioritySort: setPrioritySort,

        fetchLeads: fetchLeads,
        multiSort: multiSort,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
