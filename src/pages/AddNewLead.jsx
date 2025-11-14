import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import useSalesAgent from "../contexts/SalesAgentsContext";

export default function AddNewLead() {
  const navigate = useNavigate();

  const { salesAgents, salesAgentsLoading, salesAgentsErr } = useSalesAgent();

  // fetching tags from TAGS API
  const { data, loading, error } = useFetch(
    "https://backend-covalent-sales.vercel.app/tags"
  );

  const tagOptions = data
    ? data.map((tag) => ({ value: tag.name, label: tag.name }))
    : [];

  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [salesAgent, setSalesAgent] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [tags, setTags] = useState([]);

  function handleTags(tagsObjArr) {
    const tags = tagsObjArr.map((tagObj) => tagObj.value);
    setTags(tags);
  }

  async function handleForm(e) {
    e.preventDefault();
    if (
      name === "" ||
      source === "" ||
      salesAgent === "" ||
      status === "" ||
      priority === "" ||
      timeToClose === ""
    ) {
      return toast.error("Please fill all the required fields.");
    }

    const newLeadData = {
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
        "http://localhost:8080/leads",
        newLeadData
      );
      toast.success("New Lead Added!");
      navigate("/leads");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <>
      <main className="container">
        <h1>Add New Lead</h1>

        <form onSubmit={handleForm}>
          {/* lead name */}
          <div>
            <label htmlFor="input-name">Lead Name:</label>
            <input
              type="text"
              id="input-name"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />

          {/* source */}
          <div>
            <label htmlFor="select-source">Lead Source:</label>
            <select
              name="source"
              id="select-source"
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
            <label htmlFor="select-sales-agent">Sales Agent:</label>
            {salesAgentsLoading ? (
              <span>Loading...</span>
            ) : salesAgents && salesAgents.length > 0 ? (
              <>
                <select
                  name="sales-agent"
                  id="select-sales-agent"
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
            <label htmlFor="select-status">Lead Status:</label>
            <select
              name="status"
              id="select-status"
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
            <label htmlFor="select-priority">Priority:</label>
            <select
              name="priority"
              id="select-priority"
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
            <label htmlFor="input-timeToClose">Time to Close:</label>
            <input
              type="number"
              name="timeToClose"
              id="input-timeToClose"
              placeholder="Number of days"
              value={timeToClose}
              onChange={(e) => setTimeToClose(parseInt(e.target.value))}
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
                onChange={(tagsObjArr) => handleTags(tagsObjArr)}
              />
            ) : (
              error && <p>{error}</p>
            )}
          </div>
          <br />

          <div>
            <button className="btn btn-primary" type="submit">
              Create Lead
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
