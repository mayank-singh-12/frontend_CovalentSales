import { Link } from "react-router-dom";
import useSalesAgent from "../contexts/SalesAgentsContext";

import PageHeading from "../components/general/PageHeading";
import SideBar from "../components/general/SideBar";

export default function SalesAgentsManagement() {
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();

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
        <PageHeading>Sales Agents List</PageHeading>

        <div className="card list-card mt-3">
          <div className="card-body overflow-auto">
            {salesAgentsLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : salesAgents ? (
              salesAgents.length > 0 && (
                <>
                  {[...salesAgents].reverse().map((agent) => (
                    <div className="card record-card mb-2" key={agent._id}>
                      <Link
                        to={{
                          pathname: `/leads/agents`,
                          search: `agent=${agent._id}`,
                        }}
                        className="card-body text-decoration-none"
                      >
                        <p className="m-0">Name: {agent.name}</p>{" "}
                        <p className="m-0">Email: {agent.email}</p>
                      </Link>
                    </div>
                  ))}
                </>
              )
            ) : (
              salesAgentsErr && <p>{salesAgentsErr}</p>
            )}
          </div>
        </div>
        <div className="section form-flex">
          <Link to="/agents/new" className="btn btn-outline-dark">
            + Add New Sales Agent
          </Link>
        </div>
      </main>
    </>
  );
}
