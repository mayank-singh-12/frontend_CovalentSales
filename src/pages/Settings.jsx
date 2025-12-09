import { useState } from "react";

import { toast } from "react-toastify";

import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";

import PageHeading from "../components/general/PageHeading";
import SideBar from "../components/general/SideBar";

import axios from "axios";

import { Link } from "react-router-dom";

export default function Settings() {
  const { fetchLeads, leads, leadsLoading, leadsErr } = useLeads();
  const { fetchAgents, salesAgents, salesAgentsLoading, salesAgentsErr } =
    useSalesAgent();

  const [deleteLeadLoading, setDeleteLeadLoading] = useState(false);

  const [deleteAgentLoading, setDeleteAgentLoading] = useState(false);

  async function deleteLead(leadId) {
    try {
      setDeleteLeadLoading(true);
      const response = await axios.delete(
        `https://backend-covalent-sales.vercel.app/leads/${leadId}`
      );
      toast.success(response.data.message);
      fetchLeads();
    } catch (err) {
      toast.error(err.response.data.error);
    } finally {
      setDeleteLeadLoading(false);
    }
  }

  async function deleteAgent(agentId) {
    try {
      setDeleteAgentLoading(true);
      const response = await axios.delete(
        `https://backend-covalent-sales.vercel.app/agents/${agentId}`
      );
      toast.success(response.data.message);
      fetchAgents();
    } catch (err) {
      toast.error(err.response.data.error);
    } finally {
      setDeleteAgentLoading(false);
    }
  }

  return (
    <>
      <SideBar>
        <Link
          className="p-2 text-dark text-decoration-none sidebar-link"
          onClick={() => setShow(false)}
          to="/"
        >
          <i className="bi bi-card-list mx-2"></i>
          Dashboard
        </Link>
      </SideBar>

      <main className="container custom-container my-3">
        <PageHeading>Settings</PageHeading>
        <hr />

        <h3 className="text-center">Leads</h3>
        <div className="card grow-list-card overflow-auto my-3">
          <div className="card-body ">
            {leadsLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : leads.length > 0 ? (
              <div>
                {leads.map((lead) => (
                  <div className="card lead-card mb-2" key={lead._id}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-12 col-sm-10">
                          <Link
                            className="text-decoration-none text-dark"
                            to={deleteLeadLoading ? "#" : `/leads/${lead._id}`}
                          >
                            <div className="row">
                              <div className="col-12 col-sm-6">
                                <p className="mb-2 m-sm-0">Name: {lead.name}</p>
                                <p className="mb-2 m-sm-0">
                                  Sales Agent:{" "}
                                  {lead.salesAgent ? (
                                    lead.salesAgent.name
                                  ) : (
                                    <span className="text-danger">None</span>
                                  )}
                                </p>
                              </div>
                              <div className="col-12 col-sm-6">
                                <p className="mb-2 m-sm-0">
                                  priority: {lead.priority}
                                </p>
                                <p className="mb-2 m-sm-0">
                                  Time to Close: {lead.timeToClose}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                        <div className="col-sm-2 d-flex flex-column flex-sm-row  justify-content-sm-center align-items-sm-center">
                          <button
                            className="btn btn-danger"
                            disabled={deleteLeadLoading}
                            onClick={() => deleteLead(lead._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              leadsErr && <p>{leadsErr}</p>
            )}
          </div>
        </div>

        <hr />

        <h3 className="text-center">Sales Agents</h3>
        <div className="card list-card mt-3">
          <div className="card-body overflow-auto">
            {salesAgentsLoading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : salesAgents ? (
              salesAgents.length > 0 && (
                <>
                  {[...salesAgents].reverse().map((agent) => (
                    <div className="card record-card mb-2" key={agent._id}>
                      <div className="card-body">
                        <div className="row g-2">
                          <div className="col-10">
                            <Link
                              to={
                                deleteAgentLoading
                                  ? "#"
                                  : {
                                      pathname: `/leads/agents`,
                                      search: `agent=${agent._id}`,
                                    }
                              }
                              className="text-decoration-none text-dark"
                            >
                              <p className="m-0">Name: {agent.name}</p>{" "}
                              <p className="m-0">Email: {agent.email}</p>
                            </Link>
                          </div>
                          <div className="col-sm-2 d-flex flex-column flex-sm-row  justify-content-sm-center align-items-sm-center">
                            <button
                              className="btn btn-danger"
                              disabled={deleteAgentLoading}
                              onClick={() => deleteAgent(agent._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )
            ) : (
              salesAgentsErr && <p>{salesAgentsErr}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
