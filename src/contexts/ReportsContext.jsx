import { createContext, useContext, useMemo, useState, useEffect } from "react";
import axios from "axios";

const ReportsContext = createContext();

export default function useReports() {
  return useContext(ReportsContext);
}

export function ReportsProvider({ children }) {
  // leads in pipeline
  const [leadsInPipeline, setLeadsInPipeline] = useState([]);
  const [leadsInPipelineLoading, setleadsInPipelineLoading] = useState(true);
  const [leadsInPipelineErr, setLeadsInPipelineErr] = useState(null);

  // leads closed last week
  const [leadsClosedLastWeek, setReportsClosedLastWeek] = useState([]);
  const [leadsClosedLastWeekLoading, setReportsClosedLastWeekLoading] =
    useState(true);
  const [leadsClosedLastWeekErr, setReportsClosedLastWeekErr] = useState(null);

  async function fetchLeadsInPipeline() {
    try {
      setLeadsInPipeline([]);
      setleadsInPipelineLoading(true);
      const response = await axios.get(
        "https://backend-covalent-sales.vercel.app/report/pipeline"
      );
      setLeadsInPipeline(response.data.totalLeadsInPipeline);
      setLeadsInPipelineErr(null);
    } catch (err) {
      setLeadsInPipelineErr(err.response.data.error);
    } finally {
      setleadsInPipelineLoading(false);
    }
  }

  async function fetchLeadsClosedLastWeek() {
    try {
      setReportsClosedLastWeek([]);
      setReportsClosedLastWeekLoading(true);
      const response = await axios.get(
        "https://backend-covalent-sales.vercel.app/report/last-week"
      );
      setReportsClosedLastWeek(response.data);
      setReportsClosedLastWeekErr(null);
    } catch (err) {
      setReportsClosedLastWeekErr(err.response.data.error);
    } finally {
      setReportsClosedLastWeekLoading(false);
    }
  }

  useEffect(() => {
    fetchLeadsInPipeline();
    fetchLeadsClosedLastWeek();
  }, []);

  console.log(leadsInPipeline);

  return (
    <ReportsContext.Provider
      value={{
        // leads in pipeline
        leadsInPipeline,
        leadsInPipelineLoading,
        leadsInPipelineErr,

        // leads closed last week
        leadsClosedLastWeek,
        leadsClosedLastWeekLoading,
        leadsClosedLastWeekErr,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}
