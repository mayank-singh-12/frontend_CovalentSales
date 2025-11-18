import useLeads from "../../contexts/LeadsContext";

export default function StatusFilter() {
  const { statusFilter, setStatusFilter } = useLeads();

  return (
    <div>
      <label htmlFor="statusFilter">Status:</label>
      <select
        name="statusFilter"
        id="statusFilter"
        value={statusFilter}
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
  );
}
