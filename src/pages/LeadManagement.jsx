import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

import useLeads from "../contexts/LeadsContext";
import useComments from "../contexts/CommentsContext";

export default function LeadManagement() {
  const { leads, leadsLoading, leadsErr } = useLeads();

  // for fetching comments
  const { comments, commentsLoading, commentsErr, fetchCommentsOfLead } =
    useComments();

  const { id } = useParams();

  const leadData = leads?.find((lead) => lead._id === id);

  useEffect(() => {
    fetchCommentsOfLead(id);
  }, []);

  // for adding a new comment
  const [commentText, setCommentText] = useState("");
  const [addCommentLoading, setAddCommentLoading] = useState(false);

  async function addNewComment(leadId) {
    const commentObj = {
      author: leadData.salesAgent._id,
      commentText: commentText,
    };
    try {
      setAddCommentLoading(true);
      const response = await axios.post(
        `https://backend-covalent-sales.vercel.app/leads/${leadId}/comments`,
        commentObj
      );
      fetchCommentsOfLead(leadId);
      setCommentText("");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.error);
    } finally {
      setAddCommentLoading(false);
    }
  }

  function handleAddComment(e) {
    e.preventDefault();
    addNewComment(id);
  }

  return (
    <>
      <main className="container">
        <Link to="/">Back to Dashboard</Link>
        <h1>
          Leads Management:{" "}
          {leadsLoading ? (
            <span>Loading...</span>
          ) : (
            leads && <span>{leadData.name}</span>
          )}
        </h1>

        <hr />
        <div>
          {/* lead detail */}
          <h3>Lead Detail</h3>

          {leadsLoading ? (
            <p>Loading...</p>
          ) : (
            leads && (
              <>
                <p>Lead Name: {leadData.name}</p>
                <p>Sales Agent: {leadData.salesAgent.name}</p>
                <p>Lead Source: {leadData.source}</p>
                <p>Lead Status: {leadData.status}</p>
                <p>Priority: {leadData.priority}</p>
                <p>Time to Close: {leadData.timeToClose}</p>
                <Link className="btn btn-dark">Edit Lead Details</Link>
              </>
            )
          )}
        </div>
        <hr />

        <div>
          {/* lead comments */}
          <h3>Comments Section</h3>

          <div>
            {commentsLoading ? (
              <p>Loading...</p>
            ) : comments.length > 0 ? (
              comments.map((commentObj) => (
                <div key={commentObj._id}>
                  <span>
                    <small>{commentObj.author.name}</small>
                  </span>
                  <p>{commentObj.commentText}</p>
                </div>
              ))
            ) : (
              commentsErr && <p>{commentsErr}</p>
            )}
          </div>

          {/* add new comment */}
          <form onSubmit={handleAddComment}>
            <textarea
              name=""
              rows={4}
              cols={70}
              id=""
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <br />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={addCommentLoading}
            >
              Add Comment
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
