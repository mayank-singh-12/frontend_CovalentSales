import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddNewAgent() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function createAgentHandler(e) {
    e.preventDefault();
    if (!name || !email) {
      setError("Please fill the required fields.");
    }
    const newAgentObj = { name, email };
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/agents",
        newAgentObj
      );
      toast.success(response.data.message);
      setError("");
      setName("");
      setEmail("");
      navigate("/salesAgents");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.error);
    }
  }
  return (
    <>
      <main>
        <div className="container d-flex justify-content-center align-items-center">
          {loading ? (
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="form-card form-flex ">
              <form className="form-card-body" onSubmit={createAgentHandler}>
                <div class="section form-card-heading">
                  <h1>New Sales Agent</h1>
                </div>
                <div class="section form-flex">
                  <label htmlFor="input-name">Name*</label>
                  <input
                    type="text"
                    id="input-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div class="section form-flex">
                  <label htmlFor="input-email">Email*</label>
                  <input
                    type="email"
                    id="input-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {error !== "" && <p className="err-msg">{error}</p>}
                <div className="section form-flex">
                  <button type="submit" className="btn btn-primary">
                    Create Agent
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
