import useLeads from "../contexts/LeadsContext";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const { leads, leadsLoading, leadsErr, setStatusFilter } = useLeads();

  const leadsByStatus = leads?.reduce((acc, curr) => {
    if (!acc[curr.status]) {
      acc[curr.status] = [];
    }
    acc[curr.status].push(curr);
    return acc;
  }, {});

  return (
    <>
      <main className="container">
        <h1>Covalent Sales Dashboard</h1>
        <hr />

        <h3>Main Content</h3>
        <hr />
        {/* leads */}
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div>
            {leads.map((lead) => (
              <div key={lead._id}>
                <Link to={`/leads/${lead._id}`}>
                  {lead.name} - {lead.status} - {lead.salesAgent.name} -{" "}
                  {lead.priority} - {lead.timeToClose}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          leadsErr && <p>{leadsErr}</p>
        )}
        <hr />
        <h3>Lead Status</h3>
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          Object.keys(leadsByStatus).map((status) => (
            <div key={status}>
              <strong>{status}</strong> :{" "}
              <Link to="/">
                {leadsByStatus[status].length}{" "}
                {leadsByStatus[status].length !== 1 ? "Leads" : "Lead"}
              </Link>
            </div>
          ))
        ) : (
          leadsErr
        )}

        <hr />
        <h3>Quick Filters</h3>
        <div>
          <label htmlFor="statusFilter">Status:</label>
          <select
            name="statusFilter"
            id="statusFilter"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">None</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <br />
        <Link to="/leads/new" className="btn btn-dark">
          + Add new Lead
        </Link>

        <hr />
        <h3>Sidebar</h3>
        <Link to="/leads">Leads</Link>
        <br />
        <Link to="/agents">Sales Agents</Link>
        <br />
        <Link to="/reports">Reports</Link>
        <br />
        <Link to="/settings">Settings</Link>
      </main>
    </>
  );
}
