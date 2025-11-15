import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";
import { useState } from "react";
import { Link } from "react-router-dom";

import SalesAgentFilter from "../components/SalesAgentFilter";
import StatusFilter from "../components/StatusFilter";

export default function LeadsList() {
  // reading from leads context
  const {
    leads,
    leadsLoading,
    leadsErr,
    setStatusFilter,
    setSalesAgentFilter,
    statusFilter,
    salesAgentFilter,
  } = useLeads();

  // reading from sales agents context
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();

  const [timeToCloseSort, setTimeToCloseSort] = useState("");
  const [prioritySort, setPrioritySort] = useState("");

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

  let sortedLeads = multiSort(leads, sortConfig);

  return (
    <>
      <main className="container">
        <Link to="/">Back to Dashboard</Link>
        <h1>Leads List</h1>
        <hr />
        <h3>Lead Overview</h3>

        {/* leads */}
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div>
            {sortedLeads.map((lead) => (
              <div key={lead._id}>
                <Link to={`/leads/${lead._id}`}>
                  {lead.name} - {lead.status} - {lead.salesAgent.name} -{" "}
                  {lead.priority} - {lead.timeToClose}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          leadsErr && <p>{leadsErr}</p>
        )}

        <hr />

        {/* filters */}
        <h3>Filters</h3>

        {/* filter by status */}
        <StatusFilter />

        <br />

        {/* filter by salesAgent */}
        <SalesAgentFilter />

        <hr />
        <h3>Sort</h3>
        <div>
          {/* sort by priority */}
          <label htmlFor="">Priority:</label>
          <br />
          <input
            type="radio"
            name="prioritySort"
            id="timeToCloseSort"
            onChange={() => setPrioritySort("asc")}
            checked={prioritySort === "asc"}
          />{" "}
          Low to High
          <br />
          <input
            type="radio"
            name="prioritySort"
            id="timeToCloseSort"
            onChange={() => setPrioritySort("desc")}
            checked={prioritySort === "desc"}
          />{" "}
          High to Low
          <br />
          <br />
          {/* sort by time to close */}
          <label htmlFor="">Time to Close:</label>
          <br />
          <input
            type="radio"
            id="timeToCloseSort"
            name="timeToCloseSort"
            onChange={() => setTimeToCloseSort("asc")}
            checked={timeToCloseSort === "asc"}
          />{" "}
          Low to High
          <br />
          <input
            type="radio"
            id="timeToCloseSort"
            name="timeToCloseSort"
            onChange={() => setTimeToCloseSort("desc")}
            checked={timeToCloseSort === "desc"}
          />{" "}
          High to Low
        </div>
      </main>
    </>
  );
}
