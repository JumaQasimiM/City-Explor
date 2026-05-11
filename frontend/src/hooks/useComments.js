import { useState } from "react";
import { ApiUrl } from "../api/ApiUrl";
import { useFetch } from "./useFetch";
import { useAuth } from "../context/AuthContext";
/* ================= MAIN HOOK ================= */
export const useComments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  /* -------- CREATE -------- */
  const createPlaceComment = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/placeComments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Create failed");

      return await res.json();
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  /* -------- DELETE -------- */
  const deletePlaceComment = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/placeComments/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.access}` },
      });

      if (!res.ok) throw new Error("Delete failed");

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPlaceComment,
    deletePlaceComment,
    loading,
    error,
  };
};

export const useCommentByPlaceId = (place_id) => {
  return useFetch(
    place_id ? `${ApiUrl}/placeComments/?place=${place_id}` : null,
  );
};
