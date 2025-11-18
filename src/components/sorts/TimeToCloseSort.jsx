import useLeads from "../../contexts/LeadsContext";

export default function TimeToCloseSort() {
  const { timeToCloseSort, setTimeToCloseSort } = useLeads();

  return (
    <>
      <label htmlFor="">Time to Close:</label>
      <br />
      <input
        type="radio"
        id="timeToCloseSort"
        name="timeToCloseSort"
        onChange={() => setTimeToCloseSort("asc")}
        checked={timeToCloseSort === "asc"}
      />{" "}
      Low to High
      <br />
      <input
        type="radio"
        id="timeToCloseSort"
        name="timeToCloseSort"
        onChange={() => setTimeToCloseSort("desc")}
        checked={timeToCloseSort === "desc"}
      />{" "}
      High to Low
    </>
  );
}
