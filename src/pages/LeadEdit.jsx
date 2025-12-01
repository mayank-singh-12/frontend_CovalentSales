import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import Select from "react-select";
import { toast } from "react-toastify";

import SideBar from "../components/general/SideBar";
import PageHeading from "../components/general/PageHeading";

import useLeads from "../contexts/LeadsContext";
import useSalesAgent from "../contexts/SalesAgentsContext";

export default function LeadEdit() {
  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();

  const {
    fetchSingleLead,
    fetchLeads,
    lead,
    leadLoading,
    leadErr,
    setLeadLoading,
  } = useLeads();

  // fetching tags from TAGS API
  const { data, loading, error } = useFetch(
    "https://backend-covalent-sales.vercel.app/tags"
  );

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchSingleLead(id);
  }, []);

  useEffect(() => {
    assignValues();
  }, [lead]);

  const tagOptions = data
    ? data.map((tag) => ({ value: tag.name, label: tag.name }))
    : [];

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [tagsObjs, setTagsObjs] = useState([]);
  const [tags, setTags] = useState([]);

  function assignValues() {
    setName(lead.name ?? "");
    setSource(lead.source ?? "");
    setSalesAgent(lead.salesAgent ?? "");
    setStatus(lead.status ?? "");
    setPriority(lead.priority ?? "");
    setTimeToClose(lead.timeToClose ?? "");
    const selectedTags = lead.tags
      ? tagOptions.filter((tagObj) => lead.tags.includes(tagObj.value))
      : [];
    setTagsObjs(selectedTags);
    setTags(lead.tags ?? []);
  }

  function handleTags(tagsObjArr) {
    const tags = tagsObjArr.map((tagObj) => tagObj.value);
    setTags(tags);
    setTagsObjs(tagsObjArr);
  }

  async function handleForm(e) {
    e.preventDefault();
    const updatedLeadData = {
      name,
      source,
      salesAgent,
      status,
      priority,
      timeToClose,
      tags,
    };

    try {
      const response = await axios.post(
        `https://backend-covalent-sales.vercel.app/leads/${lead._id}/update`,
        updatedLeadData
      );
      setLeadLoading(true);
      fetchLeads();
      navigate(`/leads/${lead._id}`);
      toast.success("Lead updated successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    } finally {
      setLeadLoading(false);
    }
  }

  return (
    <>
      <SideBar>
        <Link
          className="p-2 text-dark text-decoration-none sidebar-link"
          onClick={() => setShow(false)}
          to={`/leads/${id}`}
        >
          <i className="bi bi-person-lines-fill mx-2"></i>
          Lead Management
        </Link>
      </SideBar>
      
      <main className="container custom-container my-3">
        <PageHeading>Edit Lead</PageHeading>

        <div className="card mt-3">
          <div className="card-body">
            {leadLoading ? (
              <p>Loading...</p>
            ) : lead.name !== "" ? (
              <form onSubmit={handleForm}>
                {/* lead name */}

                <div>
                  <label className="form-label" htmlFor="input-name">
                    Lead Name
                  </label>
                  <input
                    className="form-control"
                    placeholder="Full name"
                    type="text"
                    id="input-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />

                {/* source */}
                <div>
                  <label className="form-label" htmlFor="select-source">
                    Lead Source
                  </label>
                  <select
                    className="form-select"
                    name="source"
                    id="select-source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                  >
                    <option value="" hidden>
                      Select a source
                    </option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="Advertisement">Advertisement</option>
                    <option value="Email">Email</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <br />

                {/* sales agent */}
                <div>
                  <label className="form-label" htmlFor="select-sales-agent">
                    Sales Agent
                  </label>
                  {salesAgentsLoading ? (
                    <span>Loading...</span>
                  ) : salesAgents && salesAgents.length > 0 ? (
                    <>
                      <select
                        className="form-select"
                        name="sales-agent"
                        id="select-sales-agent"
                        value={salesAgent}
                        onChange={(e) => setSalesAgent(e.target.value)}
                        required
                      >
                        <option value="" hidden>
                          Select Sales Agent
                        </option>
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
                <br />

                {/* status */}
                <div>
                  <label className="form-label" htmlFor="select-status">
                    Lead Status
                  </label>
                  <select
                    className="form-select"
                    name="status"
                    id="select-status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                  >
                    <option value="" hidden>
                      Select a status
                    </option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <br />

                {/* priority */}
                <div>
                  <label className="form-label" htmlFor="select-priority">
                    Priority
                  </label>
                  <select
                    className="form-select"
                    name="priority"
                    id="select-priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  >
                    <option value="" hidden>
                      Select a priority
                    </option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <br />

                {/* time to close */}
                <div>
                  <label className="form-label" htmlFor="input-timeToClose">
                    Time to Close
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    name="timeToClose"
                    id="input-timeToClose"
                    placeholder="Number of days"
                    value={timeToClose}
                    onChange={(e) =>
                      setTimeToClose(parseInt(e.target.value) || "")
                    }
                  />
                </div>
                <br />

                {/* select tags */}
                <div>
                  <label>Tags:</label>
                  {loading ? (
                    <p>Loading...</p>
                  ) : data ? (
                    <Select
                      isMulti
                      options={tagOptions}
                      value={tagsObjs}
                      onChange={(tagsObjArr) => handleTags(tagsObjArr)}
                    />
                  ) : (
                    error && <p>{error}</p>
                  )}
                </div>
                <br />

                <div>
                  <button className="btn btn-primary" type="submit">
                    Update
                  </button>
                </div>
              </form>
            ) : (
              leadErr && <p>{leadErr}</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
