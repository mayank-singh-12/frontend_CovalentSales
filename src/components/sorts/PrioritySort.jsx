import useLeads from "../../contexts/LeadsContext";

export default function PrioritySort() {
  const { prioritySort, setPrioritySort } = useLeads();

  return (
    <>
      <label htmlFor="">Priority:</label>
      <br />
      <input
        type="radio"
        name="prioritySort"
        id="timeToCloseSort"
        onChange={() => setPrioritySort("asc")}
        checked={prioritySort === "asc"}
      />{" "}
      Low to High
      <br />
      <input
        type="radio"
        name="prioritySort"
        id="timeToCloseSort"
        onChange={() => setPrioritySort("desc")}
        checked={prioritySort === "desc"}
      />{" "}
      High to Low
    </>
  );
}
