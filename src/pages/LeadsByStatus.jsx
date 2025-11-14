import { useState } from "react";
import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LeadsByStatus() {
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();
  const {
    leads,
    leadsLoading,
    leadsErr,
    setStatusFilter,
    setSalesAgentFilter,
  } = useLeads();

  const [searchParams, setSearchParams] = useSearchParams();

  const [leadsSort, setLeadsSort] = useState("");

  const status = searchParams.get("status");

  let sortedLeads = leads;

  // sorting by time to close
  if (leadsSort === "timeToCloseLTH") {
    sortedLeads = leads.toSorted((a, b) => a.timeToClose - b.timeToClose);
  }
  if (leadsSort === "timeToCloseHTL") {
    sortedLeads = sortedLeads.toSorted((a, b) => b.timeToClose - a.timeToClose);
  }

  return (
    <>
      <main className="container">
        <h1>Leads By Status</h1>
        <hr />
        <h3>Lead List by Status</h3>
        <hr />
        <h3>Status: {status}</h3>
        <hr />
        <div>
          {leads.map((lead) => (
            <Link to={`/leads/${lead._id}`} key={lead._id}>
              {lead.name} - {lead.salesAgent.name}
            </Link>
          ))}
        </div>
        <hr />
        {/* filters */}
        <h3>Filters</h3>
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
        <h3>Sort by</h3>
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
      </main>
    </>
  );
}
