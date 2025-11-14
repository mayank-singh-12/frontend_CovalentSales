import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useSalesAgent from "../contexts/SalesAgentsContext";

export default function SalesAgentsManagement() {
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();

  return (
    <>
      <main>
        <div className="container">
          <h1 className="text-center pt-3 m-0">Sales Agent Management</h1>
          <hr />
          <div className="section">
            <h2>Sales Agent List</h2>
            {salesAgentsLoading ? (
              <div className="card list-card bg-tertiary d-flex justify-content-center align-items-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div className="card list-card bg-tertiary">
                <div className="card-body overflow-auto">
                  {salesAgents
                    ? salesAgents.length > 0 && (
                        <>
                          {[...salesAgents].reverse().map((agent) => (
                            <div
                              className="card record-card mb-2"
                              key={agent._id}
                            >
                              <div className="card-body">
                                <p className="m-0">Name: {agent.name}</p>{" "}
                                <p className="m-0">Email: {agent.email}</p>
                              </div>
                            </div>
                          ))}
                        </>
                      )
                    : salesAgentsErr && <p>{salesAgentsErr}</p>}
                </div>
              </div>
            )}
          </div>
          <div className="section form-flex pb-3">
            <Link to="/agents/new" className="btn btn-outline-dark">
              + Add New Sales Agent
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
