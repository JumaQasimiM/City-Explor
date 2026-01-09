import { useEffect, useState } from "react";

/**
 * Custom hook to fetch data from api
 * @param {string} url - API endpoint
 * @returns {object} { data, loading, error }
 */

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!url) return;

    setLoading(true);
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
};
