import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  Colors,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

import useReports from "../contexts/ReportsContext";
import useLeads from "../contexts/LeadsContext";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
);

export default function Reports() {
  const {
    leadsInPipeline,
    leadsInPipelineLoading,
    leadsInPipelineErr,

    leadsClosedLastWeek,
    leadsClosedLastWeekLoading,
    leadsClosedLastWeekErr,
  } = useReports();

  const { leads, leadsLoading, leadsErr, leadsByStatus } = useLeads();

  // Pie chart config for total leads closed and in pipeline
  const dataForLeadsSummary = {
    labels: ["Leads Closed", "Leads in Pipeline"],
    datasets: [
      {
        data: [leadsClosedLastWeek.length, leadsInPipeline],
        backgroundColor: ["#36A2EB", "lightgreen"],
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  // Bar chart config for leads closed by sales agents
  const closedLeadsByAgents = leads.reduce((acc, curr) => {
    if (curr.status === "Closed" && !acc[curr.salesAgent._id]) {
      acc[curr.salesAgent._id] = [];
    }
    if (curr.status === "Closed") {
      acc[curr.salesAgent._id].push(curr);
    }
    return acc;
  }, {});

  // agentsNames for label
  const agentsNames = leads.reduce((acc, curr) => {
    const agentName = curr.salesAgent.name;
    if (curr.status === "Closed" && !acc.includes(agentName)) {
      acc.push(agentName);
    }
    return acc;
  }, []);

  const dataForClosedLeadsByAgents = {
    labels: agentsNames,
    datasets: [
      {
        label: "Leads closed by agents",
        data: Object.keys(closedLeadsByAgents).map(
          (key) => closedLeadsByAgents[key].length
        ),
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      Colors: {
        enabled: true,
      },
    },
  };

  // Pie chart config for distributing leads by status
  const dataForLeadsDistribution = {
    labels: Object.keys(leadsByStatus),
    datasets: [
      {
        data: Object.keys(leadsByStatus).map(
          (status) => leadsByStatus[status].length
        ),
      },
    ],
  };

  return (
    <>
      <main className="container">
        <h1>Covalent Sales Reports</h1>
        <hr />
        <h3>Report Overview</h3>
        <hr />
        <p>Total Leads closed and in Pipeline: </p>
        {leadsInPipelineLoading || leadsClosedLastWeekLoading ? (
          <p>Loading...</p>
        ) : leadsClosedLastWeek.length > 0 && leadsInPipeline > 0 ? (
          <div style={{ width: "400px" }}>
            <Pie data={dataForLeadsSummary} options={options} />
          </div>
        ) : (
          <>
            {leadsInPipelineErr && <p>{leadsInPipelineErr}</p>}
            {leadsClosedLastWeekErr && <p>{leadsClosedLastWeekErr}</p>}
          </>
        )}

        <hr />
        <p>Leads Closed by Sales Agent: </p>
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div style={{ width: "400px" }}>
            <Bar data={dataForClosedLeadsByAgents} options={options} />
          </div>
        ) : (
          <>{leadsErr && <p>{leadsErr}</p>}</>
        )}

        <hr />
        <p>Leads Status Distribution: </p>
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div style={{ width: "400px" }}>
            <Pie data={dataForLeadsDistribution} options={options} />
          </div>
        ) : (
          <>{leadsErr && <p>{leadsErr}</p>}</>
        )}
      </main>
    </>
  );
}
