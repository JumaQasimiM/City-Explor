import { useFetch } from "./useFetch";
import { ApiUrl } from "../api/ApiUrl";
import { useState } from "react";

// =======================
// GET COUNTRIES
// =======================
export const useCountries = () => {
  const {
    data = [],
    error,
    loading,
    refetch,
  } = useFetch(`${ApiUrl}/countries`);

  return {
    countries: data,
    error,
    loading,
    hasCountry: data.length > 0,
    refetch,
  };
};
// get by id
export const useCountryById = (id) => {
  return useFetch(`${ApiUrl}/countries/${id}`);
};

// =======================
// CREATE COUNTRY
// =======================
export const useCreateCountry = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCountry = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/countries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to create country");
      }

      return await res.json();
    } catch (err) {
      setError(err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createCountry, loading, error };
};

// =======================
// DELETE COUNTRY
// =======================
export const useDeleteCountry = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const deleteCountry = async (country_id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/countries/${country_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete country");
      }

      return true;
    } catch (err) {
      setError(err.message || "Something went wrong");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteCountry, error, loading };
};

// edite category
export const useEditCountry = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateCountry = async (country_id, payload) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${ApiUrl}/countries/${country_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to update country");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCountry, error, loading };
};
