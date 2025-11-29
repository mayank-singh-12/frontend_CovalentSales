import useLeads from "../../contexts/LeadsContext";

export default function PrioritySort() {
  const { prioritySort, setPrioritySort } = useLeads();

  return (
    <>
      <label htmlFor="">Priority:</label>
      <br />
      <div class="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="prioritySort"
          id="priorityLTHSort"
          onChange={() => setPrioritySort("asc")}
          checked={prioritySort === "asc"}
        />{" "}
        <label className="form-check-label" for="priorityLTHSort">
          Low to High
        </label>
        <br />
        <input
          className="form-check-input"
          type="radio"
          name="prioritySort"
          id="priorityHTLSort"
          onChange={() => setPrioritySort("desc")}
          checked={prioritySort === "desc"}
        />{" "}
        <label className="form-check-label" for="priorityHTLSort">
          High to Low
        </label>
      </div>
    </>
  );
}
