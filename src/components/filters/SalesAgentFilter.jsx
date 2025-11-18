import useSalesAgent from "../../contexts/SalesAgentsContext";
import useLeads from "../../contexts/LeadsContext";

export default function SalesAgentFilter() {
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();
  const { salesAgentFilter, setSalesAgentFilter } = useLeads();

  return (
    <div>
      <label htmlFor="agent-filter">Sales Agent:</label>

      {salesAgentsLoading ? (
        <span>Loading...</span>
      ) : salesAgents && salesAgents.length > 0 ? (
        <>
          <select
            name="agent-filter"
            id="agent-filter"
            value={salesAgentFilter}
            onChange={(e) => setSalesAgentFilter(e.target.value)}
            required
          >
            <option value="">None</option>
            {salesAgents.map((agent) => (
              <option value={agent._id} key={agent._id}>
                {agent.name} - {agent.email}
              </option>
            ))}
          </select>
        </>
      ) : (
        salesAgentsErr && <span> {salesAgentsErr}</span>
      )}
    </div>
  );
}
