import useLeads from "../contexts/LeadsContext";
import { Link } from "react-router-dom";

import Header from "../components/general/Header";
import PageHeading from "../components/general/pageHeading";
import SideBar from "../components/general/SideBar";

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
  } = useLeads();

  return (
    <>
      <Header />
      <main className="container custom-container my-3">
        {/* sidebar */}
        <SideBar>

          <Link
            className="p-2 text-dark text-decoration-none sidebar-link"
            onClick={() => setShow(false)}
            to="/"
          >
            <i class="bi bi-card-list mx-2"></i>
            Dashboard
          </Link>

        </SideBar>

        <PageHeading>Leads List</PageHeading>

        {/* leads */}
        <div className="card grow-list-card overflow-auto my-3">
          <div className="card-body ">
            {leadsLoading ? (
              <p>Loading...</p>
            ) : leads.length > 0 ? (
              <div>
                {sortedLeads.map((lead) => (
                  <div className="card lead-card mb-2" key={lead._id}>
                    <div className="card-body">
                      <Link
                        className="text-decoration-none text-dark"
                        to={`/leads/${lead._id}`}
                      >
                        <div className="row">
                          <div className="col-12 col-sm-6">
                            <p className="mb-2 m-sm-0">Name: {lead.name}</p>
                            <p className="mb-2 m-sm-0">
                              Sales Agent: {lead.salesAgent.name}
                            </p>
                          </div>
                          <div className="col-12 col-sm-6">
                            <p className="mb-2 m-sm-0">
                              priority: {lead.priority}
                            </p>
                            <p className="mb-2 m-sm-0">
                              Time to Close: {lead.timeToClose}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              leadsErr && <p>{leadsErr}</p>
            )}
          </div>
        </div>

        <div className="row mb-3">
          {/* filters */}
          <div className="col-sm-6 col-12 mb-sm-0 mb-3">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Filters</h3>
                <div className="row">
                  <div className="col-6">
                    {/* filter by status */}
                    <StatusFilter />
                  </div>
                  <div className="col-6">
                    {/* filter by salesAgent */}
                    <SalesAgentFilter />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* sorts  */}
          <div className="col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Sort</h3>
                <div className="row">
                  <div className="col-6">
                    {/* sort by priority */}
                    <PrioritySort />
                  </div>
                  <div className="col-6">
                    {/* sort by time to close */}
                    <TimeToCloseSort />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/leads/new" className="btn btn-dark">
          + Add new Lead
        </Link>
      </main>
    </>
  );
}
