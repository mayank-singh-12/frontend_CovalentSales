import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setData(null);
        setLoading(true);
        const response = await axios.get(url, { params: params });
        setLoading(false);
        setError(null);
        setData(response.data);
      } catch (err) {
        setLoading(false);
        setError(err.response.data.error);
      }
    }

    fetchData();
  }, [url, params]);

  return { data, loading, error };
}
