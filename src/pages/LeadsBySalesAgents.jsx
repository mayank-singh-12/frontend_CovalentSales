import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";

import StatusFilter from "../components/filters/StatusFilter";
import PriorityFilter from "../components/filters/PriorityFilter";

import TimeToCloseSort from "../components/sorts/TimeToCloseSort";

export default function LeadsBySalesAgents() {
  const [searcParams] = useSearchParams();
  const { sortedLeads, leadsLoading, leadsErr } = useLeads();
  const { fetchAgentById, salesAgent, salesAgentLoading, salesAgentErr } =
    useSalesAgent();

  useEffect(() => {
    fetchAgentById(searcParams.get("agent"));
  }, []);

  return (
    <main className="container">
      <Link to="/agents">Back to Sales Agents</Link>
      <h1 className="text-center">Leads by Sales Agents</h1>
      <hr />
      <h3>
        Sales Agent: {leadsLoading ? <span>Loading...</span> : salesAgent.name}
      </h3>
      <hr />
      {leadsLoading ? (
        <p>Loading...</p>
      ) : sortedLeads.length > 0 ? (
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

      <h3>Filters</h3>
      <PriorityFilter />
      <br />
      <StatusFilter />

      <hr />

      <h3>Sort</h3>
      <TimeToCloseSort />
    </main>
  );
}
