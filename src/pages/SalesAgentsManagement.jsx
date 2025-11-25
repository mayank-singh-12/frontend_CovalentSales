import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useSalesAgent from "../contexts/SalesAgentsContext";
import Header from "../components/general/Header";

export default function SalesAgentsManagement() {
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();

  return (
    <>
      <Header />
      <main className="container">
        <Link className="text-decoration-none" to="/">
          <span>
            {" "}
            <i class="bi bi-arrow-left-square"></i>{" "}
          </span>{" "}
          Dashboard
        </Link>
        <h2 className="text-center">Sales Agent List</h2>
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
                : salesAgentsErr && <p>{salesAgentsErr}</p>}
            </div>
          </div>
        )}
        <div className="section form-flex">
          <Link to="/agents/new" className="btn btn-outline-dark">
            + Add New Sales Agent
          </Link>
        </div>
      </main>
    </>
  );
}
