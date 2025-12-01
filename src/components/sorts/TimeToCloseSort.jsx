import useLeads from "../../contexts/LeadsContext";

export default function TimeToCloseSort() {
  const { timeToCloseSort, setTimeToCloseSort } = useLeads();

  return (
    <>
      <label htmlFor="">Time to Close:</label>
      <br />
      <input
        className="form-check-input"
        type="radio"
        id="timeToCloseLTHSort"
        name="timeToCloseSort"
        onChange={() => setTimeToCloseSort("asc")}
        checked={timeToCloseSort === "asc"}
      />{" "}
      <label className="form-check-label" htmlFor="timeToCloseLTHSort">
        Low to High
      </label>
      <br />
      <input
        className="form-check-input"
        type="radio"  
        id="timeToCloseHTLSort"
        name="timeToCloseSort"
        onChange={() => setTimeToCloseSort("desc")}
        checked={timeToCloseSort === "desc"}
      />{" "}
      <label className="form-check-label" htmlFor="timeToCloseHTLSort">
        High to Low
      </label>
    </>
  );
}
