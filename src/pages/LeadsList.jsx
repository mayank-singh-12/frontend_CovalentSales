import useLeads from "../contexts/LeadsContext";
import { Link } from "react-router-dom";

export default function LeadsList() {
  const { leads, leadsLoading, leadsErr } = useLeads();

  return (
    <>
      <main className="container">
        <Link to="/">Back to Dashboard</Link>
        <h1>Leads List</h1>
        <hr />
        <h3>Lead Overview</h3>

        {/* leads */}
        <div>
          {leads.map((lead) => (
            <Link to={`/leads/${lead._id}`} key={lead._id}>
              {lead.name} - {lead.status} - {lead.salesAgent.name}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
