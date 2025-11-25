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

import { Link } from "react-router-dom";
import useReports from "../contexts/ReportsContext";
import useLeads from "../contexts/LeadsContext";

import Header from "../components/general/Header";

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
      <Header/>
      <main className="container chart-container mb-3">
        <Link className="text-decoration-none" to="/">
          {" "}
          <span>
            {" "}
            <i class="bi bi-arrow-left-square"></i>{" "}
          </span>{" "}
          Dashboard
        </Link>
        <h3 className="text-center">Report Overview</h3>
        <hr />
        <p className="text-center fw-bold">
          Total Leads closed and in Pipeline
        </p>
        {leadsInPipelineLoading || leadsClosedLastWeekLoading ? (
          <p>Loading...</p>
        ) : leadsClosedLastWeek.length > 0 && leadsInPipeline > 0 ? (
          <div className="d-flex justify-content-center">
            <div className="chart">
              <Pie data={dataForLeadsSummary} options={options} />
            </div>
          </div>
        ) : (
          <>
            {leadsInPipelineErr && <p>{leadsInPipelineErr}</p>}
            {leadsClosedLastWeekErr && <p>{leadsClosedLastWeekErr}</p>}
          </>
        )}

        <hr />
        <p className="text-center fw-bold">Leads Closed by Sales Agent</p>
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div className="d-flex justify-content-center">
            <div className="chart">
              <Bar data={dataForClosedLeadsByAgents} options={options} />
            </div>
          </div>
        ) : (
          <>{leadsErr && <p>{leadsErr}</p>}</>
        )}

        <hr />
        <p className="text-center fw-bold">Leads Status Distribution </p>
        {leadsLoading ? (
          <p>Loading...</p>
        ) : leads.length > 0 ? (
          <div className="d-flex justify-content-center">
            <div className="chart">
              <Pie data={dataForLeadsDistribution} options={options} />
            </div>
          </div>
        ) : (
          <>{leadsErr && <p>{leadsErr}</p>}</>
        )}
      </main>
    </>
  );
}
