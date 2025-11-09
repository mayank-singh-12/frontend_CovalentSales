import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";

const LeadsContext = createContext();

export default function useLeads() {
  return useContext(LeadsContext);
}

export function LeadsProvider({ children }) {
  const { data, loading, error } = useFetch("http://localhost:8080/leads");

  return (
    <LeadsContext.Provider
      value={{ leads: data || [], leadsLoading: loading, leadsErr: error }}
    >
      {children}
    </LeadsContext.Provider>
  );
}
