import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CommentsContext = createContext();

export default function useComments() {
  return useContext(CommentsContext);
}

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [commetsLoading, setCommetsLoading] = useState(true);
  const [commetsErr, setCommetsErr] = useState(null);

  async function fetchCommentsOfLead(leadId) {
    try {
      setCommetsLoading(true);
      const response = await axios.get(
        `https://backend-covalent-sales.vercel.app/leads/${leadId}/comments`
      );
      setComments(response.data);
      setCommetsErr(null);
    } catch (err) {
      setCommetsErr(err.response.data.error);
    } finally {
      setCommetsLoading(false);
    }
  }

  return (
    <CommentsContext.Provider
      value={{
        comments: comments,
        commentsLoading: commetsLoading,
        commentsErr: commetsErr,
        fetchCommentsOfLead: fetchCommentsOfLead,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}
