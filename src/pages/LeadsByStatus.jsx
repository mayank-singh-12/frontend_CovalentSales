import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

// context
import useLeads from "../contexts/LeadsContext";

import SalesAgentFilter from "../components/filters/SalesAgentFilter";
import PriorityFilter from "../components/filters/PriorityFilter";

import TimeToCloseSort from "../components/sorts/TimeToCloseSort";

import PageHeading from "../components/general/PageHeading";
import SideBar from "../components/general/SideBar";

import Leads from "../components/general/Leads";

export default function LeadsByStatus() {
  const { sortedLeads, leadsLoading, leadsErr } = useLeads();

  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");

  return (
    <>
      <SideBar>
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
        <PageHeading>Status: {status}</PageHeading>

        {/* <div className="card grow-list-card overflow-auto my-3">
          <div className="card-body ">
            {leadsLoading ? (
              <p>Loading...</p>
            ) : sortedLeads.length > 0 ? (
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
          <div className="col-12 col-sm-6">
            <div className="card">
              <div className="card-body">
                {/* filters */}
                <h3 className="text-center">Filters</h3>
                {/* sales agent filter */}
                <SalesAgentFilter />
                <br />
                {/* priority filter */}
                <PriorityFilter />
              </div>
            </div>
          </div>

          {/* <TimeToCloseSort/> */}
          <div className="col-12 col-sm-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Sort by</h3>
                <TimeToCloseSort />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
