import { useEffect, useState } from "react";

/**
 * Custom hook to fetch data from api
 * @param {string} url - API endpoint
 * @returns {object} { data, loading, error }
 */

export const useFetch = (url) => {
  // always start with empty array  -- useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Cannot fetch data: ${res.statusText}`);
      const result = await res.json();
      // guarantee array ans safe no crush
      setData(result || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
      // reset to empty array on error
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error };
};
