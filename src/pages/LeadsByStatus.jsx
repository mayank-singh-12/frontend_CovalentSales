import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

// context
import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";

import SalesAgentFilter from "../components/filters/SalesAgentFilter";
import PriorityFilter from "../components/filters/PriorityFilter";

import PrioritySort from "../components/sorts/PrioritySort";
import TimeToCloseSort from "../components/sorts/TimeToCloseSort";

export default function LeadsByStatus() {
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();
  const { sortedLeads } = useLeads();

  const [searchParams, setSearchParams] = useSearchParams();

  const [leadsSort, setLeadsSort] = useState("");

  const status = searchParams.get("status");

  // let sortedLeads = leads;

  // // sorting by time to close
  // if (leadsSort === "timeToCloseLTH") {
  //   sortedLeads = leads.toSorted((a, b) => a.timeToClose - b.timeToClose);
  // }
  // if (leadsSort === "timeToCloseHTL") {
  //   sortedLeads = sortedLeads.toSorted((a, b) => b.timeToClose - a.timeToClose);
  // }

  return (
    <>
      <main className="container">
        <Link to="/">Back to Dashboard</Link>
        <h1 className="text-center">Leads By Status</h1>
        <hr />
        <h3>Status: {status}</h3>
        <hr />
        <div>
          {sortedLeads?.map((lead) => (
            <div key={lead._id}>
              <Link to={`/leads/${lead._id}`}>
                {lead.name} - {lead.salesAgent.name} - {lead.priority} -{" "}
                {lead.timeToClose}
              </Link>
            </div>
          ))}
        </div>
        <hr />
        {/* filters */}
        <h3>Filters</h3>
        {/* sales agent filter */}
        <SalesAgentFilter />
        <br />
        {/* priority filter */}
        <PriorityFilter />
        <hr />
        <h3>Sort by</h3>

        <TimeToCloseSort />
        {/* <PrioritySort/> */}

        {/* <label htmlFor="">Time to Close:</label>
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
        High to Low */}
      </main>
    </>
  );
}
