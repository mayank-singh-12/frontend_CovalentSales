import useLeads from "../contexts/LeadsContext";
import { Link } from "react-router-dom";

import SalesAgentFilter from "../components/filters/SalesAgentFilter";
import StatusFilter from "../components/filters/StatusFilter";

import PrioritySort from "../components/sorts/PrioritySort";
import TimeToCloseSort from "../components/sorts/TimeToCloseSort";

export default function LeadsList() {
  // reading from leads context
  const {
    leads,
    leadsLoading,
    leadsErr,

    // sort var's
    sortedLeads,
    timeToCloseSort,
    prioritySort,

    // functions for sorting
    setTimeToCloseSort,
    setPrioritySort,
  } = useLeads();

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
        <div>
          <h3>Filters</h3>

          {/* filter by status */}
          <StatusFilter />

          <br />

          {/* filter by salesAgent */}
          <SalesAgentFilter />
        </div>

        <hr />

        {/* sorts  */}
        <div>
          <h3>Sort</h3>

          {/* sort by priority */}
          <PrioritySort />

          <br />
          <br />

          {/* sort by time to close */}
          <TimeToCloseSort />
        </div>
      </main>
    </>
  );
}
