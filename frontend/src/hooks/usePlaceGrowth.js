import { useEffect, useState } from "react";
import { ApiUrl } from "../api/ApiUrl";
import { useAuth } from "../context/AuthContext";

export const usePlaceGrowth = (period) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    if (!user?.access) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${ApiUrl}/places/growth/?period=${period}`, {
          headers: {
            Authorization: `Bearer ${user.access}`,
          },
        });

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period, user]);

  return { data, loading };
};
