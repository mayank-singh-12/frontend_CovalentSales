import useLeads from "../../contexts/LeadsContext";

export default function PriorityFilter() {
  const { priorityFilter, setPriorityFilter } = useLeads();

  return (
    <div>
      <label htmlFor="priorityFilter">Priority:</label>
      <select
        name="priorityFilter"
        id="priorityFilter"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="">None</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}
