import useLeads from "../contexts/LeadsContext";
import StatusFilter from "../components/filters/StatusFilter";
import { Link } from "react-router-dom";

import PageHeading from "../components/general/PageHeading";

import SideBar from "../components/general/SideBar";

import Leads from "../components/general/Leads";

export default function Dashboard() {
  const { leads, leadsLoading, leadsErr, leadsByStatus } =
    useLeads();

  return (
    <>
      <SideBar>
        <Link
          className="p-2 text-dark text-decoration-none sidebar-link"
          onClick={() => setShow(false)}
          to="/leads"
        >
          <i className="bi bi-person-lines-fill mx-2"></i>
          Leads
        </Link>

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
          to="/reports"
        >
          <i className="bi bi-pie-chart-fill  mx-2"></i>
          Reports
        </Link>

        <Link
          className="p-2 text-dark text-decoration-none sidebar-link"
          onClick={() => setShow(false)}
          to="/settings"
        >
          <i className="bi bi-gear-wide-connected mx-2"></i>
          Settings
        </Link>
      </SideBar>

      <main className="container custom-container my-3">
        <PageHeading>Dashboard</PageHeading>

        {/* leads */}
        {/* <div className="card grow-list-card overflow-auto my-3">
          <div className="card-body ">
            {leadsLoading ? (
              <p>Loading...</p>
            ) : leads.length > 0 ? (
              <div>
                {leads.map((lead) => (
                  <div className="card record-card mb-2" key={lead._id}>
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

        {/* leads grouped by status */}
        <h3 className="text-center">Leads by Status</h3>
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div className="row">
            {Object.keys(leadsByStatus).map((status) => (
              <div
                className="col-6 col-md-3 d-flex justify-content-center g-2"
                key={status}
              >
                <Link
                  className="badge badge-card text-decoration-none text-dark fw-medium"
                  to={{ pathname: `/leads/status`, search: `status=${status}` }}
                >
                  <strong>{status}</strong> → {leadsByStatus[status].length}{" "}
                  {leadsByStatus[status].length !== 1 ? "Leads" : "Lead"}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          leadsErr
        )}

        <hr />
        <h3 className="text-center">Quick Filters</h3>

        {/* filter by status */}
        <StatusFilter />

        <br />
        <Link to="/leads/new" className="btn btn-dark">
          + Add new Lead
        </Link>
      </main>
    </>
  );
}
