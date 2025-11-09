import useLeads from "../contexts/LeadsContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LeadManagement() {
  const { leads, leadsLoading, leadsErr } = useLeads();

  const { id } = useParams();

  const leadData = leads?.find((lead) => lead._id === id);

  console.log(leadsLoading);

  console.log(leadData);

  return (
    <>
      <main className="container">
        <Link to="/">Back to Dashboard</Link>
        <h1>
          Leads Management:{" "}
          {leadsLoading ? (
            <span>Loading...</span>
          ) : (
            leads && <span>{leadData.name}</span>
          )}
        </h1>

        <hr />
        <div>
          {/* lead detail */}
          <h3>Lead Detail</h3>

          {leadsLoading ? (
            <p>Loading...</p>
          ) : (
            leads && (
              <>
                <p>Lead Name: {leadData.name}</p>
                <p>Sales Agent: {leadData.salesAgent.name}</p>
                <p>Lead Source: {leadData.source}</p>
                <p>Lead Status: {leadData.status}</p>
                <p>Priority: {leadData.priority}</p>
                <p>Time to Close: {leadData.timeToClose}</p>
                <Link className="btn btn-dark">Edit Lead Details</Link>
              </>
            )
          )}
        </div>
        <hr />

        {/* lead comments */}
        <h3>Comments Section</h3>
      </main>
    </>
  );
}
