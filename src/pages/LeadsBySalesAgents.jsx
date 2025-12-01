import { useEffect } from "react";

import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";

import StatusFilter from "../components/filters/StatusFilter";
import PriorityFilter from "../components/filters/PriorityFilter";

import PageHeading from "../components/general/PageHeading";
import SideBar from "../components/general/SideBar";

import TimeToCloseSort from "../components/sorts/TimeToCloseSort";

import Leads from "../components/general/Leads";

export default function LeadsBySalesAgents() {
  const [searcParams] = useSearchParams();
  const { sortedLeads, leadsLoading, leadsErr } = useLeads();
  const { fetchAgentById, salesAgent } =
    useSalesAgent();

  useEffect(() => {
    fetchAgentById(searcParams.get("agent"));
  }, []);

  return (
    <>
      <SideBar>
        <Link
          className="p-2 text-dark text-decoration-none sidebar-link"
          onClick={() => setShow(false)}
          to="/agents"
        >
          <i className="bi bi bi-people-fill mx-2"></i>
          Sales Agents
        </Link>

        <Link
          className="p-2 text-dark text-decoration-none sidebar-link"
          onClick={() => setShow(false)}
          to="/"
        >
          <i className="bi bi-card-list mx-2"></i>
          Dashboard
        </Link>
      </SideBar>

      <main className="container custom-container my-3">
        <PageHeading>
          Sales Agent:{" "}
          {leadsLoading ? <span>Loading...</span> : salesAgent.name}
        </PageHeading>

        {/* <div className="card grow-list-card overflow-auto my-3">
          <div className="card-body ">
            {leadsLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
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
                              Sales Agent:{" "}
                              {lead.salesAgent ? (
                                lead.salesAgent.name
                              ) : (
                                <span className="text-danger">None</span>
                              )}
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
        </div> */}

        <Leads/>

        <div className="row g-3">
          {/* filters */}
          <div className="col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Filters</h3>
                <div className="row">
                  <div className="col-6">
                    <PriorityFilter />
                  </div>
                  <div className="col-6">
                    <StatusFilter />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* sort */}
          <div className="col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Sort</h3>
                <TimeToCloseSort />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
