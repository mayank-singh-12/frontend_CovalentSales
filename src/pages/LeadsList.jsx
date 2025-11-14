import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LeadsList() {
  // importing variables and functions from context
  const {
    leads,
    leadsLoading,
    leadsErr,
    setStatusFilter,
    setSalesAgentFilter,
  } = useLeads();

  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();

  const [leadsSort, setLeadsSort] = useState("");

  let sortedLeads = leads;

  // sorting by time to close
  if (leadsSort === "timeToCloseLTH") {
    sortedLeads = leads.toSorted((a, b) => a.timeToClose - b.timeToClose);
  }
  if (leadsSort === "timeToCloseHTL") {
    sortedLeads = sortedLeads.toSorted((a, b) => b.timeToClose - a.timeToClose);
  }

  // sorting by priority
  const priorityArr = ["Low", "Medium", "High"];
  if (leadsSort === "priorityLTH") {
    sortedLeads = sortedLeads.toSorted(
      (a, b) =>
        priorityArr.indexOf(a.priority) - priorityArr.indexOf(b.priority)
    );
  }
  if (leadsSort === "priorityHTL") {
    sortedLeads = sortedLeads.toSorted(
      (a, b) =>
        priorityArr.indexOf(b.priority) - priorityArr.indexOf(a.priority)
    );
  }

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
            onChange={() => setLeadsSort("priorityLTH")}
            checked={leadsSort === "priorityLTH"}
          />{" "}
          Low to High
          <br />
          <input
            type="radio"
            name="prioritySort"
            id="timeToCloseSort"
            onChange={() => setLeadsSort("priorityHTL")}
            checked={leadsSort === "priorityHTL"}
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
            onChange={() => setLeadsSort("timeToCloseLTH")}
            checked={leadsSort === "timeToCloseLTH"}
          />{" "}
          Low to High
          <br />
          <input
            type="radio"
            id="timeToCloseSort"
            name="timeToCloseSort"
            onChange={() => setLeadsSort("timeToCloseHTL")}
            checked={leadsSort === "timeToCloseHTL"}
          />{" "}
          High to Low
        </div>
      </main>
    </>
  );
}
