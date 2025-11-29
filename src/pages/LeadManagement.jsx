import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import axios from "axios";

import useLeads from "../contexts/LeadsContext";
import useComments from "../contexts/CommentsContext";
import useSideBar from "../contexts/SideBarContext";

import SideBar from "../components/general/SideBar";
import PageHeading from "../components/general/pageHeading";

import Header from "../components/general/Header";

export default function LeadManagement() {
  const { leads, leadsLoading, leadsErr } = useLeads();
  const { setShow } = useSideBar();

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
      <Header />
      <main className="container custom-container my-3">
        {/* sidebar */}
        <SideBar>
          <Link
            className="p-2 text-dark text-decoration-none sidebar-link"
            onClick={() => setShow(false)}
            to="/leads"
          >
            <i className="bi bi-person-lines-fill mx-2"></i>
            Leads
          </Link>

          <Link
            className="p-2 text-dark text-decoration-none sidebar-link"
            onClick={() => setShow(false)}
            to="/"
          >
            <i class="bi bi-card-list mx-2"></i>
            Dashboard
          </Link>
        </SideBar>

        <PageHeading>
          Leads Management:{" "}
          {leadsLoading ? (
            <span>Loading...</span>
          ) : (
            leads && <span>{leadData.name}</span>
          )}
        </PageHeading>

        <hr />
        <div>
          {/* lead detail */}
          <h3 className="text-center">Lead Detail</h3>

          {leadsLoading ? (
            <p>Loading...</p>
          ) : (
            leads && (
              <>
                <div className="list-group mb-3">
                  <p className="list-group-item m-0">
                    Lead Name: {leadData.name}
                  </p>
                  <p className="list-group-item m-0">
                    Sales Agent: {leadData.salesAgent.name}
                  </p>
                  <p className="list-group-item m-0">
                    Lead Source: {leadData.source}
                  </p>
                  <p className="list-group-item m-0">
                    Lead Status: {leadData.status}
                  </p>
                  <p className="list-group-item m-0">
                    Priority: {leadData.priority}
                  </p>
                  <p className="list-group-item m-0">
                    Time to Close: {leadData.timeToClose}
                  </p>
                </div>
                <Link className="btn btn-dark">Edit Lead Details</Link>
              </>
            )
          )}
        </div>
        <hr />

        <div>
          {/* lead comments */}
          <h3 className="text-center">Comments Section</h3>

          <div className="card grow-list-card overflow-auto">
            <div className="card-body">
              {commentsLoading ? (
                <p>Loading...</p>
              ) : comments.length > 0 ? (
                [...comments].reverse().map((commentObj) => (
                  <div className="card comment-card mb-2" key={commentObj._id}>
                    <div className="card-body">
                      <span>
                        <small className="text-secondary fs-small">
                          {commentObj.author.name}
                        </small>
                        <small className="text-secondary fs-small ms-2">
                          {new Date(commentObj.createdAt).toDateString()}
                        </small>
                        <small className="text-secondary fs-small ms-2">
                          {new Date(commentObj.createdAt).toLocaleTimeString(
                            "en-US"
                          )}
                        </small>
                      </span>
                      <p className="m-0">{commentObj.commentText}</p>
                    </div>
                  </div>
                ))
              ) : (
                commentsErr && <p>{commentsErr}</p>
              )}
            </div>
          </div>

          {/* add new comment */}
          <form onSubmit={handleAddComment}>
            <div className="mt-2">
              <textarea
                className="form-control corner-sharp h-50"
                placeholder="comment"
                name="commentText"
                id="commentText"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <button
              className="btn btn-primary mt-2"
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
