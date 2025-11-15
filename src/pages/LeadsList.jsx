import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";
import { useState } from "react";
import { Link } from "react-router-dom";

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
        <div>
          <label htmlFor="statusFilter">Status:</label>
          <select
            name="statusFilter"
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">None</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <br />

        {/* filter by salesAgent */}
        <div>
          <label htmlFor="agent-filter">Sales Agent:</label>

          {salesAgentsLoading ? (
            <span>Loading...</span>
          ) : salesAgents && salesAgents.length > 0 ? (
            <>
              <select
                name="agent-filter"
                id="agent-filter"
                value={salesAgentFilter}
                onChange={(e) => setSalesAgentFilter(e.target.value)}
                required
              >
                <option value="">None</option>
                {salesAgents.map((agent) => (
                  <option value={agent._id} key={agent._id}>
                    {agent.name} - {agent.email}
                  </option>
                ))}
              </select>
            </>
          ) : (
            salesAgentsErr && <span> {salesAgentsErr}</span>
          )}
        </div>
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
