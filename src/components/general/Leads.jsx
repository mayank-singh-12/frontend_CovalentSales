import useLeads from "../../contexts/LeadsContext";
import { Link } from "react-router-dom";

export default function Leads() {
  const { leads, sortedLeads, leadsLoading, leadsErr } = useLeads();

  return (
    <div className="card grow-list-card overflow-auto my-3">
      <div className="card-body ">
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div>
            {sortedLeads.map((lead) => (
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
                            <span className="text-danger">Unknown</span>
                          )}
                        </p>
                      </div>
                      <div className="col-12 col-sm-6">
                        <p className="mb-2 m-sm-0">priority: {lead.priority}</p>
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
  );
}
